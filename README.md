Source of Video: https://youtu.be/jlHWnKVpygw by NetworkChuck

Guide
What do you need?
TIMESTAMP: 1:07

Raspberry Pi (really any model, but 4 is always best): https://geni.us/BmCeEgp
USB WiFi Adapter: https://geni.us/dhSSn
Coffee: https://NetworkChuck.Coffee
Get the official openwrt image from http://tech.webit.nu/openwrt-on-raspberry-pi-4/

What this is going to look like (the BIG picture)
TIMESTAMP: 2:25



STEP 1 - Bake the Pi (Install OpenWRT)
TIMESTAMP: 3:27

OpenWRT Download: https://openwrt.org/toh/raspberry_pi_foundation/raspberry_pi

Raspberry Pi Imager: https://bit.ly/3mwqh7Z



STEP 2 - Login to your Pi
TIMESTAMP: 4:54



STEP 3 - OpenWRT Basic Setup
TIMESTAMP: 6:24

Change your password
Command: passwd
Backup your config
Commands
cd /etc/config
cp firewall firewall.bk
cp wireless wireless.bk
cp network network.bk

STEP 4 - Configure OpenWRT Network
TIMESTAMP: 9:29



STEP 5 - Connect OpenWRT to WiFi
TIMESTAMP: 14:48



STEP 6 - Setup the USB Wireless Adapter
TIMESTAMP: 20:02

Update OpenWRT packages
opkg update
Install drivers and stuff
opkg install kmod-rt2800-lib kmod-rt2800-usb kmod-rt2x00-lib kmod-rt2x00-usb kmod-usb-core kmod-usb-uhci kmod-usb-ohci kmod-usb2 usbutils openvpn-openssl luci-app-openvpn nano

STEP 7 - Wireless Network Setup
TIMESTAMP: 21:59


Upload your config file to the Raspberry Pi:
scp your_file_name_here root@10.71.71.1:/etc/openvpn/client.conf

https://forum.openwrt.org/t/expressvpn-in-openvpn-on-openwrt-success/97986
and
https://forum.openwrt.org/t/destination-port-unreachable/116227/20
and


Change lan ip so lan and wan don't overlap. https://openwrt.org/faq/change_lan_ip
For backgroound -> https://forum.openwrt.org/t/vpn-works-with-just-1-connection/116808/

sudo mkfs.ext4 /dev/sdb
