To do this, start a command prompt, and type in:

netsh wlan show interfaces
This shows all wireless interfaces on your system. When your wireless is active and connected to an AP, you get output similar to this:

    Name                   : Wireless Network Connection
    Description            : Intel(R) WiFi Link 5100 AGN
    GUID                   : f5ad6606-3b9d-41b3-8e5b-91b870edd256
    Physical address       : 00:21:6b:9d:db:ec
    State                  : connected
    SSID                   : green
    BSSID                  : 00:23:69:94:0c:f9
    Network type           : Infrastructure
    Radio type             : 802.11g
    Authentication         : WPA2-Personal
    Cipher                 : TKIP
    Connection mode        : Auto Connect
    Channel                : 11
    Receive rate (Mbps)    : 54
    Transmit rate (Mbps)   : 54
    Signal                 : 99%
    Profile                : green
Note the line that says BSSID: this is the MAC address of the wireless access point.
This is not necessarily the same MAC as when you were to ping the access point through a wired network: most (if not, all) access points have two MACs, one for the wireless side, and one for the wired side.

As a bonus, in the output you can also see other neat statistics: the receive and transmit rate (bandwidth), signal strength, authentication type, etc. They are updated in real-time (i.e. each time you query the interface with netsh.

Inactive wireless

If your wireless interface is not active, you get output like this:

    Name                   : Wireless Network Connection
    Description            : Intel(R) WiFi Link 5100 AGN
    GUID                   : f5ad6606-3b9d-41b3-8e5b-91b870edd256
    Physical address       : 00:21:6b:9d:db:ec
    State                  : disconnected
This was tested on a Windows 7 64-bit, but should work on all XP and Vista boxes as well. There's a lot more you can do with netsh. Start it without parameters and check out its internal help to find out about all the goodies inside.
