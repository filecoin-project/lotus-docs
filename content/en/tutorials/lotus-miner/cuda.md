---
title: "CUDA Setup"
description: "This is a step by step guide on how to configure and use CUDA architecture for Lotus instead of OpenCL for Nvidia cards."
lead: "This is a step by step guide on how to configure and use CUDA architecture for Lotus instead of OpenCL for Nvidia cards."
draft: false
menu:
    tutorials:
        parent: "tutorials-providers"
weight: 215
toc: true
---

## Installing latest stable Nvidia drivers

Many Linux distributions provide packages of the NVIDIA Linux Graphics Driver in the distribution's native package management format. These packages may interact better with the rest of your distribution's framework, and you may want to use these packages rather than NVIDIA's official package.

1. Download the latest stable package for your card using [the Nvidia website](https://www.nvidia.com/download/index.aspx).
1. Once you have downloaded the driver, change to the directory containing the driver package and install the driver by running, as root, `sh ./NVIDIA-Linux-x86_64-<driver version>.run`:
    
    ```shell
    mkdir ~/nvidia-drivers
    cd ~/nvidia-drivers
    wget https://us.download.nvidia.com/XFree86/Linux-x86_64/510.54/NVIDIA-Linux-x86_64-510.54.run
    sudo sh NVIDIA-Linux-x86_64-510.54.run
    ```

1. One of the last installation steps will prompt to update your X configuration file (for X-server). Either accept that offer, edit your X configuration file manually so that the NVIDIA X driver will be used, or run `nvidia-xconfig`. There are some changes in the latest Nvidia driver, so if you upgrade your driver, remember to check `nvidia-smi`; it will always display the correct name for the GPU.
    
    If you are using an nvidia driver below < `460.91.03`
    
    ```shell
    export RUST_GPU_TOOLS_CUSTOM_GPU="GeForce RTX 3090:10496"
    ```
    
    If you are using an Nvidia driver above > `510.47.03`
    
    ```shell
    export RUST_GPU_TOOLS_CUSTOM_GPU="NVIDIA GeForce RTX 3090:10496"
    ```
    
Nvidia RTX 3090 was used in this example. Remember to replace the GPU model and the number of CUDA cores.

## Installing the latest CUDA toolkit

1. Download the latest CUDA toolkit from [the Nvidia website.](https://developer.nvidia.com/cuda-toolkit).
1. Once you have downloaded the cuda-toolkit, change to the directory containing the installer and install by running, as root, `sh cuda_<version>.run`:
    
    ```shell
    mkdir ~/cuda
    cd ~/cuda
    wget https://developer.download.nvidia.com/compute/cuda/11.6.1/local_installers/cuda_11.6.1_510.47.03_linux.run
    sudo sh cuda_11.6.1_510.47.03_linux.run
    ```

1. Use `SPACEBAR` to select and deselect an installation option. Only install the CUDA toolkit. You do not need any other packages.
1. Press `ENTER` to begin the installation and wait for it to finish.

## Configuring the variables

1. We need to add the newly installed CUDA to the PATH environment variable for the Linux user that will compile and run Lotus:
    
    ```shell
    echo -e `export PATH=$PATH:/usr/local/cuda-11.6/bin \n export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda-11.6/lib64` >> ~/.bashrc && source ~/.bashrc
    ```

1. Reboot the system for the changes to take effect, and then verify that the new CUDA toolkit and Nvidia driver versions are in use:
    
    ```shell
    sudo nvidia-smi 

    > +-----------------------------------------------------------------------------+
    > | NVIDIA-SMI 510.47.03    Driver Version: 510.47.03    CUDA Version: 11.6     |
    > |-------------------------------+----------------------+----------------------+
    > | GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
    > | Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
    > |                               |                      |               MIG M. |
    > |===============================+======================+======================|
    > |   0  NVIDIA GeForce ...  Off  | 00000000:41:00.0  On |                  N/A |
    > | 54%   49C    P8    43W / 390W |    490MiB / 24576MiB |      1%      Default |
    > |                               |                      |                  N/A |
    > +-------------------------------+----------------------+----------------------+
    > |   1  NVIDIA GeForce ...  Off  | 00000000:61:00.0 Off |                  N/A |
    > |  0%   30C    P8    33W / 390W |      6MiB / 24576MiB |      0%      Default |
    > |                               |                      |                  N/A |
    > +-------------------------------+----------------------+----------------------+
    ```

