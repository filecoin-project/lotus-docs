---
title: "Add swap on Linux"
description: "This is a guide for adding swap to a linux machine."
date: 2022-03-17T12:00:35+01:00
lastmod: 2021-11-16T12:00:35+01:00
draft: false
menu:
  kb:
    parent: "browse"
toc: false
pinned: false
types: ["article"]
areas: ["swap", "Linux"]
---

## Add swap on lotus miner or worker node:

If you only have 128 GiB of RAM, you will need to make sure your system provides at least an extra 256 GiB of very fast swap (preferably NVMe SSD) or you will be unable to seal sectors:

```shell
sudo fallocate -l 256G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
# show current swap spaces and take note of the current highest priority
swapon --show
# append the following line to /etc/fstab (ensure highest priority) and then reboot
# /swapfile swap swap pri=50 0 0
sudo reboot
# check a 256GB swap file is automatically mounted and has the highest priority
swapon --show
```
