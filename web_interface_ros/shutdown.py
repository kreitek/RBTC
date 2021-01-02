import subprocess
from time import sleep
import threading


def subprocess_thread(subargs, delay):
    sleep(delay)
    print(subargs)
    subprocess.call(subargs)


def subprocess_delay(subargs, delay):
    thd = threading.Thread(target=subprocess_thread, args=(subargs, delay))
    thd.start()


def shutdown():
    subprocess_delay(['shutdown', "-h", "now"], 3)


def reboot():
    subprocess_delay(['shutdown', "-r", "now"], 3)
