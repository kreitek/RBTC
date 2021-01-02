



# Create symlinks for configuration files
```
sudo ln -s /home/ubuntu/RBTC/ros_ws/src/rbtc_bringup/conf/rbtc_bringup.service /etc/systemd/system/rbtc_bringup.service
chmod +x /home/ubuntu/RBTC/ros_ws/src/rbtc_bringup/conf/rbtc_bringup
sudo ln -s /home/ubuntu/RBTC/ros_ws/src/rbtc_bringup/conf/rbtc_bringup /usr/sbin/rbtc_bringup
```

```
systemctl daemon-reload

systemctl start rbtc_bringup.service
systemctl enable rbtc_bringup.service  # autoestart
systemctl status rbtc_bringup.service
journalctl -u rbtc_bringup.service -f

systemctl stop rbtc_bringup.service
systemctl disable rbtc_bringup.service

```
