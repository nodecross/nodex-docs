# How to implement UNiD EDGE SDK to RA6M5

This section describes the steps to integrate UNiD EDGE SDK into your e2studio project. You can exclusively choose to compile the e2studio project as a C language implementation or as a C++ language implementation, but in this document we will assume that it is compiled as a C language implementation.

## Prerequisites
- Operating System
    - An environment that can run e2studio (Linux, Windows, etc.)
- IDE
    - Renesas e2studio 2021-10 (21.10.0) [Build Id: R20210916-1304]
    - SEGGER J-Link 7.54
- RTOS select for e2studio project
    - FreeRTOS

The procedures described in this section are based on the assumption that the system is operated in the above or equivalent environment.

## Integration for UNiD EDGE SDK

- **Open the C/C++ project settings**
From the Project Explorer, right-click on the project where you want to integrate the SDK and select the [C/C++ Project Settings] menu.

:::{figure-md}
:align: center

<img src="_assets/figure11.png" height="300" alt="figure11">

**Figure 11.** [C/C++ Project Settings] menu
:::

- **Add a Includes definition**
Make sure that the [Settings] menu in the left pane of the [C/C++ Project Settings] window is selected. From the [Tool Settings] tab in the middle of the [Settings] window, click the [Includes] menu in the [GNU Arm Cross C Compiler] tree. [In the Include Paths (-l) list, specify the directory path where the UNiD EDGE SDK header files are stored.

**Table 6.** Header file directory path
| Header file directory path |
| --- |
| "${workspace_loc:/${ProjName}/unid}" |

:::{figure-md}
:align: center

<img src="_assets/figure12.png" height="350" alt="figure12">

**Figure 12.** [Includes] tree on [C/C++ Project Settings] window
:::

- **Add a Libraries definition**
Make sure that the [Settings] menu in the left pane of the [C/C++ Project Settings] window is selected. From the [Tool Settings] tab in the [Settings] window, click the [Libraries] menu included in the [GNU Arm Cross C Linker] tree. Specify the library identification letter of UNiD EDGE SDK in [Libraries (-l)] list and the directory path where UNiD EDGE SDK libraries are stored in [Library search path (-L)] list.

**Table 7.** Library identifier
| Library identifier |
| --- |
| unid |

**Table 8.** Library directory path
| Library directory path |
| --- |
| "${workspace_loc:/${ProjName}/unid}" |


:::{figure-md}
:align: center

<img src="_assets/figure13.png" height="350" alt="figure13">

**Figure 13.** [Libraries] tree on [C/C++ Project Settings] window
:::

After completing the above settings, click the [Apply and Close] button at the bottom of the [C/C++ Project Settings] screen to close the window.

- **Deploying the UNiD EDGE SDK**
Create a new [unid] directory for the e2studio project. In the [unid] directory, store the three files defined below.

- **unid/libunid.a**
Store the libunid.a file generated by the build procedure in the previous section.

- **unid/libunid.c**
It will contain libunid.c file which is included in GitHub repository of UNiD EDGE SDK. The file path in the repository is as described below.

**Table 9.** Repository path for libunid.c
| Repository path: libunid.c |
| --- |
| https://github.com/getunid/unid/blob/main/bindings/renesas/ra/ra6m5/libunid.c |


- **unid/libunid.h**
It will contain libunid.h file which is included in GitHub repository of UNiD EDGE SDK. The file path in the repository is as described below.

**Table 10.** Repository path for libunid.h
| Repository path: libunid.h |
| --- |
| https://github.com/getunid/unid/blob/main/bindings/renesas/ra/ra6m5/libunid.h |

:::{figure-md}
:align: center

<img src="_assets/figure14.png" height="300" alt="figure14">

**Figure 14.** [unid] directory into your project
:::

## Memory usage settings
- **Open the [FSP Configuration] screen.**
Click the [FSP Configuration] button near the top right of the e2studio main window.

:::{figure-md}
:align: center

<img src="_assets/figure15.png" height="100" alt="figure15">

**Figure 15.** [FSP Configuration] button
:::

- **Open the FSP configuration window.**
In the left pane of the e2studio main window, go to [Project Explorer] and double click on the [configuration.xml] file included in the project where you want to embed UNiD EDGE SDK.

:::{figure-md}
:align: center

<img src="_assets/figure16.png" height="250" alt="figure16">

**Figure 16.** [configuration.xml] file in your project
:::

- **Add a stack of heap memory**
:::{admonition} Note
:class: warning

This procedure may vary depending on the project configuration to be embedded with UNiD EDGE SDK.
:::

Make sure the Stacks Configuration screen is displayed and add the [Heap 4] stack to the main thread defined in the [Threads] group. The [Heap 4] stack can be added by selecting [FreeRTOS] > [Memory Management] > [Heap 4] from the [New Stack] menu in the right pane of the [Stacks Configuration] screen.

:::{figure-md}
:align: center

<img src="_assets/figure17.png" height="300" alt="figure17">

**Figure 17.** [Stack Configuration] screen
:::

There are 5 implementations of heap area available in FreeRTOS, Heap 1, Heap 2, Heap 3, Heap 4, and Heap 5, and UNiD EDGE SDK is designed to use [Heap 4]. The differences between these heap implementations are described in detail on the FreeRTOS official page.

- FreeRTOS - Memory management options for the FreeRTOS small footprint, professional grade, real time kernel (scheduler) https://www.freertos.org/a00111.html


- **Enable dynamic memory allocation and set the maximum available heap memory**

:::{admonition} Note
:class: warning

This procedure may vary depending on the project configuration to be embedded with UNiD EDGE SDK.
:::

On the same Stacks Configuration screen, make sure that the main thread defined in the Threads group is selected, and that the Properties tab is visible in the e2studio main window. (The position of the [Properties] tab varies depending on the window settings of e2studio. In the following screenshot, it is displayed on the lower left side of the screen.)

On the Properties tab, in the [Common] tree > [Memory Allocation] tree > [Total Heap Size] key, enter the setting value [0x96000].

:::{figure-md}
:align: center

<img src="_assets/figure18.png" height="300" alt="figure18">

**Figure 18.** [Memory Allocation] and [Total Heap Size] settings
:::

[0x96000] is 614,400 in decimal, which means that 600KB is available as heap memory. Please note that the maximum heap memory of 600KB is not the minimum requirement for using UNiD EDGE SDK, but it is the maximum amount of memory available for the RA6M5 chip.

This completes the process of embedding UNiD EDGE SDK into e2studio.