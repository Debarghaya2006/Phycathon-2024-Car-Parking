// Created by Simple Circuits 

#include <Servo.h> 

Servo myservo;

int IR1 = 2;
int IR2 = 3;

int Slot = 4;           // Total number of parking slots

int flag1 = 0;
int flag2 = 0;

void setup() {
  Serial.begin(9600); 
  
  pinMode(IR1, INPUT);
  pinMode(IR2, INPUT);
  
  myservo.attach(4);
  myservo.write(100);  // Initial position of the servo (gate closed)

  Serial.println("ARDUINO PARKING SYSTEM");
}

void loop(){ 
  // Car entering detection
  if (digitalRead(IR1) == LOW && flag1 == 0 && Slot > 0) {
    flag1 = 1;
    myservo.write(0);  // Open the gate
    Serial.println("Car detected at entrance. Gate opening...");
    delay(1000);       // Give the car enough time to pass through (5 seconds)
    Slot--;            // Decrease the slot count
  } else if (Slot <= 0 && digitalRead(IR1) == LOW) {
    Serial.println("SORRY :( Parking Full");
    delay(1000);       // Delay to avoid flooding with messages
  }

  // Car exiting detection
  if (digitalRead(IR2) == LOW && flag2 == 0 && Slot >= 0 && Slot < 4) {
    flag2 = 1;
    myservo.write(0);  // Open the gate for exiting car
    Serial.println("Car detected at exit. Gate opening...");
    delay(500);       // Give the car enough time to exit (5 seconds)
    Slot++;            // Increase the slot count only if there are cars in the lot
  }

  // Close the gate after the car has passed
  if (flag1 == 1 || flag2 == 1) {
    delay(500);           // Additional delay to ensure the car has fully passed (3 seconds)
    myservo.write(100);     // Close the gate
    Serial.println("Gate closing...");
    
    // Reset the flags only after the gate has been closed
    flag1 = 0;
    flag2 = 0;
    delay(500);  // Small delay to prevent immediate re-triggering
  }

  // Display slot count on the serial monitor
  Serial.print("Slots Left: ");
  Serial.println(Slot);
  delay(500);  // Add a small delay to avoid serial flooding
}
