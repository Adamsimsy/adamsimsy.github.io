---
layout: post
title: "Convert Hyper-V generation 2 vhdx disk to generation 1 vhd disk"
date: 2018-06-16 13:08:09
categories: virtualization
tags: hyper-v vhdx vhd virtualization
thumbnail: /images/hyper-v/image1-convert-to-vhd.png
---
If you ever find you need to downgrade a Windows hyper-v machine from generation 2 .vhdx to a generation .vhd, this unfortunately doesn't work by simply using the Hyper-V Manager edit and convert utility.

![Convert hyper-v disk](/images/hyper-v/image1-convert-to-vhd.png)

What you'll get is a blinking cursor when you attached the converted .vhd disk to a new generation 1 VM.
<!-- more -->

You can try attaching a Windows installation ISO, booting into the recovery options, using command prompt and "bootrec /fixmbr" tools but this won't work because the drive is still configured to boot using GPT/UEFI instead of MBR. 

This is where I got stuck until I found the following steps that worked.

## The solution

### Convert the disk to generation 1

Firstly you will need to convert your generation 2 .vhdx to generation 1 .vhd as above. This might take some time to convert.

You then need to attach this image using windows disk management. Do this by clicking "Action > Attach VHD". This is ready for a step later for the clone.

### Create new target vhd

Next create a new "Action > Create VHD" and use the following settings:

![Create new vhd](/images/hyper-v/image2-create-new-vhd.png)

### Initialize new disk for MBR

Then initialize the disk by right clicking on the new drive and then use MBR (Master Boot Record) option.

![Initialize disks](/images/hyper-v/image3-initialise-disk.png)

### Create a new simple volume

You then need to create a New Simple Volume by right clicking on the disk and selecting a drive letter and all the default options as below:

![New simple volume](/images/hyper-v/image4-new-simple-volume.png)

You'll then see something like this in disk management with DISK 1 (the converted vhd drive which won't boot due to GPT) and DISK 2 (the empty vhd which is formatted for MBR).

![Old and new disks](/images/hyper-v/image5-old-and-new-disks.png)

### Clone from converted gpt disk to target mbr vhd

Next we need to clone the windows volume from the converted "gpt vhd" to the "mbr vhd".

The only way I found to do this was to download and install a tool called AOMEI Backupper from https://www.backup-utility.com/downloads.html.

This looks like a reputable tool from https://www.tenforums.com/software-apps/85310-aomei-backupperfull-exe-safe.html.

Use the Clone partition option with the options as below. You'll find this runs surprisingly quickly.

![AOMEI Backupper clone](/images/hyper-v/image6-aomei-backupper-converter.png)

### Attach disk to vm and fixmbr

Now create a new virtual machine in Hyper-v Manager that has attached the new vhd that was cloned. 

Also attach a Windows installation ISO to this VM, boot into the VM and use the recovery option.  We need to do this to fix the MBR so we can boot. Do this by executing the following commands in recovery command prompt in the following order:
{% highlight batch %}
diskpart
diskpart > Select volume 1
diskpart > active
diskpart > exit
cd /d c:\
bootrec /fixmbr
bootrec /fixboot
bootrec /rebuildbcd (select yes for [1]  c:\windows)
Exit
{% endhighlight %}

### Finished with bootable vm

Stop the VM, eject the Windows ISO and then start the VM and you should get windows booting again on generation 1 vhd using mbr :)

![Successfull windows boot](/images/hyper-v/image7-succesful-windows-boot.png)
