import subprocess
from time import sleep


def shutdown():
    sleep(2)
    subprocess.call(['shutdown', "-h", "now"])

def reboot():
    sleep(2)
    subprocess.call(['shutdown', "-r", "now"])
