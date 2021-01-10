#include <micro_ros_arduino.h>

#include <stdio.h>
#include <rcl/rcl.h>
#include <rcl/error_handling.h>
#include <rclc/rclc.h>
#include <rclc/executor.h>

#include <std_msgs/msg/int32.h>

#define RCCHECK(fn) { rcl_ret_t temp_rc = fn; if((temp_rc != RCL_RET_OK)){error_loop();}}
#define RCSOFTCHECK(fn) { rcl_ret_t temp_rc = fn; if((temp_rc != RCL_RET_OK)){}}
#define SCB_AIRCR (*(volatile uint32_t *)0xE000ED0C) // Application Interrupt and Reset Control location

#define LED_PIN 13

// Publishers and messages
rcl_publisher_t publisher;
std_msgs__msg__Int32 msg_pub;
// suscribers and messages
rcl_subscription_t subscriber;
std_msgs__msg__Int32 msg_sub;
// ROS Common
rclc_executor_t executor;
rclc_support_t support;
rcl_allocator_t allocator;
rcl_node_t node;
rcl_timer_t timer;

void softRestart() {
  Serial.end();  //clears the serial monitor  if used
  SCB_AIRCR = 0x05FA0004;  //write value for restart
  for(;;){}
}

void error_loop(){
  for(unsigned char i=0; i<50; i++){
    digitalWrite(LED_PIN, !digitalRead(LED_PIN));
    delay(100);
  }
  softRestart();
}

void timer_callback(rcl_timer_t * timer, int64_t last_call_time){  
  RCLC_UNUSED(last_call_time);
  if (timer != NULL) {
    // RCSOFTCHECK(rcl_publish(&publisher, &msg_pub, NULL));
    // msg_pub.data++;
  }
}

void subscription_callback(const void * msgin){  
  const std_msgs__msg__Int32 * msg = (const std_msgs__msg__Int32 *)msgin;
  digitalWrite(LED_PIN, (msg->data == 0) ? LOW : HIGH);  
}


void setup() {
  
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);  
  delay(2000);
  digitalWrite(LED_PIN, HIGH);  


  allocator = rcl_get_default_allocator();

  //create init_options
  RCSOFTCHECK(rclc_support_init(&support, 0, NULL, &allocator));

  // create node
  node = rcl_get_zero_initialized_node();
  RCSOFTCHECK(rclc_node_init_default(&node, "micro_ros_arduino_node", "", &support));

  // create subscriber
  RCSOFTCHECK(rclc_subscription_init_default(
    &subscriber,
    &node,
    ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32),
    "micro_ros_arduino_subscriber"));

  // create publisher
  msg_pub.data = 0;
  // rclc_publisher_init_best_effort
  RCSOFTCHECK(rclc_publisher_init_default(
    &publisher,
    &node,
    ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32),
    "micro_ros_arduino_node_publisher"));

  // create timer,
  timer = rcl_get_zero_initialized_timer();
  const unsigned int timer_timeout = 1000;
  RCSOFTCHECK(rclc_timer_init_default(
    &timer,
    &support,
    RCL_MS_TO_NS(timer_timeout),
    timer_callback));

  // create executor
  executor = rclc_executor_get_zero_initialized_executor();
  RCSOFTCHECK(rclc_executor_init(&executor, &support.context, 1, &allocator));
  unsigned int rcl_wait_timeout = 100;   // in ms
  RCSOFTCHECK(rclc_executor_set_timeout(&executor, RCL_MS_TO_NS(rcl_wait_timeout)));
  RCSOFTCHECK(rclc_executor_add_subscription(&executor, &subscriber, &msg_sub, &subscription_callback, ON_NEW_DATA));
  // RCSOFTCHECK(rclc_executor_add_timer(&executor, &timer));  // with both publisher and suscriber timer dont initialize

}

void loop() {
  // delay(100);
  RCSOFTCHECK(rclc_executor_spin_some(&executor, RCL_MS_TO_NS(500)));  // block until message or timeout
  // rclc_executor_spin(&executor);
  RCSOFTCHECK(rcl_publish(&publisher, &msg_pub, NULL));
  msg_pub.data++;
}