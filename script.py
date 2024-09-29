import RPi.GPIO as GPIO
import time

# Set up GPIO 17 as an output
import os

os.system("raspi-gpio set 17 op")

def send_command_to_arduino():
    # Set GPIO 17 high (3.3V) to send a signal to Arduino
    os.system("raspi-gpio set 17 dh")
    time.sleep(0.5)  # hold the signal for 500ms
    os.system("raspi-gpio set 17 dl")  # set GPIO 17 low (0V) to reset the signal

# Call the function to send the command
send_command_to_arduino()