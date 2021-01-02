

# Create symlinks for configuration files
```
sudo ln -s /home/ubuntu/RBTC/web_interface_ros/conf/rbtc_web.service /etc/systemd/system/rbtc_web.service
```

```
systemctl daemon-reload

systemctl start rbtc_web.service
systemctl enable rbtc_web.service  # autoestart
systemctl status rbtc_web.service
journalctl -u rbtc_web.service -f

systemctl stop rbtc_web.service
systemctl disable rbtc_web.service

```
