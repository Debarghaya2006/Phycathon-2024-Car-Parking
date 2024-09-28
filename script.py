import RPi.GPIO as GPIO
import time

# Set up GPIO 17 as an output
GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.OUT, initial=GPIO.LOW)

def send_command_to_arduino():
    # Set GPIO 17 high (3.3V) to send a signal to Arduino
    GPIO.output(17, GPIO.HIGH)
    time.sleep(0.1)  # hold the signal for 100ms
    GPIO.output(17, GPIO.LOW)  # set GPIO 17 low (0V) to reset the signal

# Call the function to send the command
send_command_to_arduino()