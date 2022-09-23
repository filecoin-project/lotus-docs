---
title: "Create a local network - Prerequisites"
description: "Prerequisites for creating a local network."
lead: "Prerequisites for creating a local network."
draft: false
menu:
    lotus:
        parent: "lotus-developers"
weight: 310
toc: true
---

The following page describes the prerequisites for the 

# Hardware Prerequisites

Your hardware must meet the following minimum requirements:

- 2 CPU cores 
- 4 GB RAM

# System Prerequisites

Because a `local-net` requires the `lotus` daemon, you must have Lotus installed. Before you install `lotus`, complete the system-specific prerequisites based on your OS.

- [Linux](#Linux-Prerequisites)
- [MacOS](#MacOS-Prerequisites)

## Linux Prerequisites

Depending on which Linux distribution you are using, building Lotus requires some distribution-specific dependencies. Additionally, `rustup` and Go must be installed. Select your Linux flavor below and complete the distribution-specific dependency installations. Once complete, install Rustup and Go 1.17.9 (or higher).

1. [Install Dependencies](#Install-Dependencies)
2. [Install `rustup`](#Install-Rustup)
3. [Install Go](#Install-Go)


### Install Dependencies

In your Linux OS, navigate to your terminal application. Then, install the dependencies required for your specific Linux distribution using the command listed.

- [Arch](#Arch)
- [Ubuntu and Debian](#Ubuntu-and-Debian)
- [Fedora](#Fedora)
- [OpenSUSE](#Ubuntu-and-Debian)
- [Amazon Linux 2](#Amazon-Linux-2)

#### Arch

```shell
sudo pacman -Syu opencl-icd-loader gcc git bzr jq pkg-config opencl-icd-loader opencl-headers opencl-nvidia hwloc
```

#### Ubuntu/Debian:

```shell
sudo apt install mesa-opencl-icd ocl-icd-opencl-dev gcc git bzr jq pkg-config curl clang build-essential hwloc libhwloc-dev wget -y && sudo apt upgrade -y
```

#### Fedora:

```shell
sudo dnf -y install gcc make git bzr jq pkgconfig mesa-libOpenCL mesa-libOpenCL-devel opencl-headers ocl-icd ocl-icd-devel clang llvm wget hwloc hwloc-devel
```

#### OpenSUSE:

```shell
sudo zypper in gcc git jq make libOpenCL1 opencl-headers ocl-icd-devel clang llvm hwloc && sudo ln -s /usr/lib64/libOpenCL.so.1 /usr/lib64/libOpenCL.so
```

#### Amazon Linux 2:

```shell
sudo yum install -y https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm; sudo yum install -y git gcc bzr jq pkgconfig clang llvm mesa-libGL-devel opencl-headers ocl-icd ocl-icd-devel hwloc-devel
```

Now that you've installed the distribution-specific dependencies, install Rustup.

#### Install rustup

Lotus requires [`rustup`](https://rustup.rs). To install `rustup`, run the following command in your terminal:

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Now that you've installed `rustup`, install Go.

#### Install Go

Lotus requires a working installation of [Go 1.17.9 or higher](https://golang.org/dl/) to build. To install Go 1.17.9, run the following command in your terminal:

```shell
wget -c https://golang.org/dl/go1.17.9.linux-amd64.tar.gz -O - | sudo tar -xz -C /usr/local
```

{{< alert icon="tip">}}
The `/usr/local/go/bin` must be added to your path. For most Linux distributions, the following command will add `/usr/local/go/bin` to your path:

```shell
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc && source ~/.bashrc
```

See the [official Golang installation instructions](https://golang.org/doc/install) for further Go installation troubleshooting.
{{< /alert >}}

### MacOS

1. [Install XCode CLI](#Install-XCode-CLI)
2. [Install `rustup`](#Install-Rustup)
3. [Install Go](#Install-Go)

#### Install XCode CLI

To build Lotus from source, the XCode CLI command line tools must be installed. To install the XCode CLI command line tools, do the following:

1. First, check if you already have the XCode Command Line Tools installed:

```shell
xcode-select -p
```

2. Examine the output of the command. 

   - If this command returns a path similar to the one shown below, XCode is already installed:

     ```plaintext
     /Library/Developer/CommandLineTools
     ```

   - If the command doesn't return a path, XCode is not installed. Install XCode using the following command:

   ```shell
   xcode-select --install
   ```

Now, [install dependencies using Homebrew](#homebrew).

#### Homebrew

Install all of the necessary packages using [Homebrew](https://brew.sh):

```shell
brew install go bzr jq pkg-config rustup hwloc coreutils
```

Next, install Rust using `rustup`.

#### Rust

Using `rustup`, download and install the official compiler for the Rust programming language, as well as its package manager, Cargo:

```shell
rustup-init
```

Select the default installation option unless you are familiar with customisation.

Now, create the necessary environment variables.

#### Environment variables

Follow the steps below to create the necessary environment variables:

1. Create `LIBRARY_PATH`:
```shell
export LIBRARY_PATH=/opt/homebrew/lib
```

1. Create `FFI_BUILD_FROM_SOURCE`:
```shell
export FFI_BUILD_FROM_SOURCE=1
```

1. Create `PATH`
```shell
export PATH="$(brew --prefix coreutils)/libexec/gnubin:/usr/local/bin:$PATH"
```