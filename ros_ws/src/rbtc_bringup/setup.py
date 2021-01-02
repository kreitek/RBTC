from setuptools import setup
import os
from glob import glob


package_name = 'rbtc_bringup'

setup(
    name=package_name,
    version='0.9.0',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages', ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name), glob('launch/*.launch.py')),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='Daniel Alvarez',
    maintainer_email='danidask@gmail.com',
    description='RBTC Bringup',
    license='MIT',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
        ],
    },
)
