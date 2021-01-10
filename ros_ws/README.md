

# INSTALL ROS2 RASPBERRY PI

- [Download image Ubuntu Server 20.04 LTS 64 bits](https://ubuntu.com/download/raspberry-pi)
- [Follow instructions](https://gist.github.com/danidask/4ac330977444b6c0edcbd99a3991cb83)



# DEPENDENCIES

`git clone https://github.com/RobotWebTools/rosbridge_suite.git --branch ros2`


# MICRO-ROS

# INSTALL AGENT

https://micro-ros.github.io/docs/tutorials/core/first_application_linux/

```
cd workspace_root
git clone -b $ROS_DISTRO https://github.com/micro-ROS/micro_ros_setup.git src/micro_ros_setup
sudo apt update && rosdep update
rosdep install --from-path src --ignore-src -y
colcon build --packages-select micro_ros_setup
source install/local_setup.bash
ros2 run micro_ros_setup create_agent_ws.sh
ros2 run micro_ros_setup build_agent.sh
source install/local_setup.bash
```

ros2 run micro_ros_agent micro_ros_agent serial --dev /dev/serial/by-id/usb-Teensyduino_USB_Serial_3801390-if00 -v6

# REFERENCES

https://index.ros.org/doc/ros2/Tutorials/Creating-Your-First-ROS2-Package/#createpkg


# NOTES

colcon build --symlink-install  # saves you from having to rebuild every time you tweak python scripts
colcon build --packages-select my_package  # only my_package (saves time)

colcon build --symlink-install --packages-select gcode_interface && rosdep install -i --from-path src --rosdistro foxy -y

https://linuxize.com/post/how-to-add-swap-space-on-ubuntu-20-04/





                                     
--- stderr: rosapi                                          
/home/ros2/dev_ws/install/rosapi/lib/python3.8/site-packages/rosapi/params.py:123: SyntaxWarning: "is not" with a literal. Did you mean "!="?
  if default is not "":

    if not default:
