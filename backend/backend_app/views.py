from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache
import time

import cv2
import numpy as np
import os

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.callbacks import TensorBoard

import mediapipe as mp

def extract_keypoints(results):
        pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*4)
        face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(468*3)
        lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
        rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
        return np.concatenate([pose, face, lh, rh])

def mediapipe_detection(image, model):
    if image is None:
        raise ValueError('No image found')
    else:
        print("Yes!Image!!!!!!!!!!!!")
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) # COLOR CONVERSION BGR 2 RGB
    image.flags.writeable = False                  # Image is no longer writeable
    results = model.process(image)                 # Make prediction
    image.flags.writeable = True                   # Image is now writeable 
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR) # COLOR COVERSION RGB 2 BGR
    return image, results
    
def draw_landmarks(image, results):
    
        mp_holistic = mp.solutions.holistic # Holistic model
        mp_drawing = mp.solutions.drawing_utils # Drawing utilities
        
        mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION) # Draw face connections
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS) # Draw pose connections
        mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS) # Draw left hand connections
        mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS) # Draw right hand connections

def draw_styled_landmarks(image, results):

    mp_holistic = mp.solutions.holistic # Holistic model
    mp_drawing = mp.solutions.drawing_utils # Drawing utilities

    # Draw face connections
    mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION, 
                             mp_drawing.DrawingSpec(color=(80,110,10), thickness=1, circle_radius=1), 
                             mp_drawing.DrawingSpec(color=(80,256,121), thickness=1, circle_radius=1)
                             ) 
    # Draw pose connections
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
                             mp_drawing.DrawingSpec(color=(80,22,10), thickness=2, circle_radius=4), 
                             mp_drawing.DrawingSpec(color=(80,44,121), thickness=2, circle_radius=2)
                             ) 
    # Draw left hand connections
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS, 
                             mp_drawing.DrawingSpec(color=(121,22,76), thickness=2, circle_radius=4), 
                             mp_drawing.DrawingSpec(color=(121,44,250), thickness=2, circle_radius=2)
                             ) 
    # Draw right hand connections  
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS, 
                             mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=4), 
                             mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2)
                             ) 
    
class recognitionModel(APIView):
 
    #def post(self, request):
    def post(self, request):
        model_cache_key = 'model_cache'
        model = cache.get(model_cache_key) # get model from cache
        
        mp_holistic = mp.solutions.holistic # Holistic model
        mp_drawing = mp.solutions.drawing_utils # Drawing utilities
        
        print('hello')
        # Create your views here.
        log_dir = os.path.join('Logs')
        tb_callback = TensorBoard(log_dir=log_dir)
        
        # Actions that we try to detect
        actions = np.array(['crack', 'mix', 'pour', 'cook'])

        model = Sequential()
        model.add(LSTM(64, return_sequences=True, activation='relu', input_shape=(30,1662)))
        model.add(LSTM(128, return_sequences=True, activation='relu'))
        model.add(LSTM(64, return_sequences=False, activation='relu'))
        model.add(Dense(64, activation='relu'))
        model.add(Dense(32, activation='relu'))
        model.add(Dense(actions.shape[0], activation='softmax'))
        
        model.compile(optimizer='Adam', loss='categorical_crossentropy', metrics=['categorical_accuracy'])
        
        module_dir = os.path.dirname(__file__)  # get current directory
        file_path = os.path.join(module_dir, 'action.h5')
        
        model.load_weights(file_path)
        
        cache.set(model_cache_key, model, None) # save in the cache
        
        # 1. New detection variables
        sequence = []
        sentence = []
        threshold = 0.8


        cap = cv2.VideoCapture(0)
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1024)
        time.sleep(2)
        cap.set(cv2.CAP_PROP_EXPOSURE, -8.0)
        time.sleep(10)
        # if not cap.isOpened():
        #     return Response({'error': 'Webcam not accessible'}, status=status.HTTP_400_BAD_REQUEST)
        # Set mediapipe model 
        with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
            while cap.isOpened():

                # Read feed
                ret, frame = cap.read()

                # Make detections
                try:
                    image, results = mediapipe_detection(frame, holistic)
                except ValueError as e:
                    print(e)
                    continue
                print(results)
                
                # Draw landmarks
                draw_styled_landmarks(image, results)
                
                # 2. Prediction logic
                keypoints = extract_keypoints(results)
                #sequence.insert(0,keypoints)
                #sequence = sequence[:30]
                sequence.append(keypoints)
                sequence = sequence[-30:]
                
                res = None
                if len(sequence) == 30:
                    res = model.predict(np.expand_dims(sequence, axis=0))[0]
                    print(actions[np.argmax(res)])
                responsePrediction = actions[np.argmax(res)]
                if cv2.waitKey(10) & 0xFF == ord('q'):
                    break
                cap.release()
                cv2.destroyAllWindows()

                return Response({'prediction': responsePrediction}, status=status.HTTP_200_OK)

                    
                # #3. Viz logic
                #     if res[np.argmax(res)] > threshold: 
                #         if len(sentence) > 0: 
                #             if actions[np.argmax(res)] != sentence[-1]:
                #                 sentence.append(actions[np.argmax(res)])
                #         else:
                #             sentence.append(actions[np.argmax(res)])

                #     if len(sentence) > 5: 
                #         sentence = sentence[-5:]

                #     # Viz probabilities
                #     image = prob_viz(res, actions, image, colors)
                    
                # cv2.rectangle(image, (0,0), (640, 40), (245, 117, 16), -1)
                # cv2.putText(image, ' '.join(sentence), (3,30), 
                #             cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
                
                # # Show to screen
                # cv2.imshow('OpenCV Feed', image)

                # Break gracefully

            
class testBackend(APIView):
    def post(self, request):
        return Response({'prediction': 'test backend output'}, status=status.HTTP_200_OK)