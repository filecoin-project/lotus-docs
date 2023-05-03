---
title: "Soft FD limit is low"
description: "This is a solution to soft FD limit is low error."
date: 2021-11-16T12:00:35+01:00
lastmod: 2021-11-16T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["solution"]
areas: ["OS", "Linux", "Lotus Node"]
---

## Problem:

An alert, similar to the following, shows up in lotus or lotus-miner.

`active process:fd-limit last raised at 2021-12-09 16:30:39.901 +0800 +08; reason: {"message":"soft FD limit is low","recommended_min":100000,"soft_limit":16384}`

Note that this error is an example from Ubuntu, but would be similar in other OS variants. 

## Environment:

* Mainnet
* Calibnet
* Devnet

## Resolution:

This will be host OS specific, but it should be similar on all OS types. Below is the example from Ubuntu. You will also have to reboot.
```
sudo echo "* soft nofile 256000" >> /etc/security/limits.conf
sudo echo "* hard nofile 512000" >> /etc/security/limits.conf
sudo sysctl -p
```
Values of the above resolution (the big number) may vary.


**Debian:**

On Debian systems the file-descriptor limit must be set in `/etc/security/limits.conf`, `/etc/systemd/system.conf` and `/etc/systemd/user.conf`.

Make also sure that you don't override these in your systemd service file.

**Mac OSX:**
```bash
sudo echo "limit maxfiles 1000000 1048576" >/etc/launchd.conf
```
And reboot.


## Extras:

[https://filecoinproject.slack.com/archives/CPFTWMY7N/p1639041748439100](https://filecoinproject.slack.com/archives/CPFTWMY7N/p1639041748439100)


