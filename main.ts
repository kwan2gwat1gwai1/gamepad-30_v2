/**
 * User Buttons for DFRobot gamer:bit Players.
 */
//%
enum GamerBitPin {
    //% block="G-PAD up"
    P15 = DAL.MICROBIT_ID_IO_P15,
    //% block="G-PAD down"
    P13 = DAL.MICROBIT_ID_IO_P13,
    //% block="G-PAD left"
    P16 = DAL.MICROBIT_ID_IO_P16,
    //% block="G-PAD right"
    P14 = DAL.MICROBIT_ID_IO_P14,

    //% block="G-PAD joystick"
    P8 = DAL.MICROBIT_ID_IO_P8,
}

/**
 * Trigger Events Proposed by DFRobot gamer:bit Players.
 */
//%
enum GamerBitEvent {
    //% block="pressed"
    Down = DAL.MICROBIT_BUTTON_EVT_DOWN,
    //% block="released"
    Up = DAL.MICROBIT_BUTTON_EVT_UP,
    //% block="click"
    Click = DAL.MICROBIT_BUTTON_EVT_CLICK,
}

/**
 * Trigger Events Proposed by DFRobot joystick Players.
 */
//%
enum JoystickEvent {
    //% block="north-west"
    North_West = DAL.MES_DPAD_BUTTON_A_DOWN,
    //% block="north"
    North = DAL.MES_DPAD_BUTTON_1_DOWN,
    //% block="north-east"
    North_East = DAL.MES_DPAD_BUTTON_D_DOWN,

    //% block="west"
    West = DAL.MES_DPAD_BUTTON_2_DOWN,
    //% block="centre"
    Centre = DAL.MES_DPAD_BUTTON_C_UP,
    //% block="east"
    East = DAL.MES_DPAD_BUTTON_4_DOWN,

    //% block="south-west"
    South_West = DAL.MES_DPAD_BUTTON_B_DOWN,
    //% block="south"
    South = DAL.MES_DPAD_BUTTON_3_DOWN,
    //% block="south-east"
    South_East = DAL.MES_DPAD_BUTTON_C_DOWN,
}

/**
 * Functions for DFRobot gamer:bit Players.
 */
//% weight=10 color=#00B0F0 icon="\uf11b" block="gamePad"
namespace gamePad {
    let PIN_INIT = 0;
    
    let p1 = 0
    let p2 = 0
    
    let JOY_STATE = 0
    let JOY_INIT = 0

    let wait_time = 50000
    
    basic.forever(function () {
        if (JOY_INIT == 1) {
            p1 = pins.analogReadPin(AnalogPin.P1)
            p2 = pins.analogReadPin(AnalogPin.P2)

            if (p2 > 683) {
                if (p1 > 683 && JOY_STATE != 3) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_D_DOWN
                    )
                    JOY_STATE = 3
                    control.waitMicros(wait_time)
                } else if (p1 > 344 && p1 < 683 && JOY_STATE != 2) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_1_DOWN
                    )
                    JOY_STATE = 2
                    control.waitMicros(wait_time)
                } else if (p1 < 344 && JOY_STATE != 1) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_A_DOWN
                    )
                    JOY_STATE = 1
                    control.waitMicros(wait_time)
                }
            } else if (p2 > 344) {
                if (p1 > 683 && JOY_STATE != 6) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_4_DOWN
                    )
                    JOY_STATE = 6
                    control.waitMicros(wait_time)
                } else if (p1 > 344 && p1 < 683 && JOY_STATE != 5) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_C_UP
                    )
                    JOY_STATE = 5
                    control.waitMicros(wait_time)
                } else if (p1 < 344 && JOY_STATE != 4) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_2_DOWN
                    )
                    JOY_STATE = 4
                    control.waitMicros(wait_time)
                }
            } else {
                if (p1 > 683 && JOY_STATE != 9) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_C_DOWN
                    )
                    JOY_STATE = 9
                    control.waitMicros(wait_time)
                } else if (p1 > 344 && p1 < 683 && JOY_STATE != 8) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_3_DOWN
                    )
                    JOY_STATE = 8
                    control.waitMicros(wait_time)
                } else if (p1 < 344 && JOY_STATE != 7) {
                    control.raiseEvent(
                    EventBusSource.MES_DPAD_CONTROLLER_ID,
                    EventBusValue.MES_DPAD_BUTTON_B_DOWN
                    )
                    JOY_STATE = 7
                    control.waitMicros(wait_time)
                }
            }
        }
    })

    export enum Vibrator { 
        //% blockId="V0" block="Off"
        V0 = 0,
        //% blockId="V1" block="On"
        V1 = 255,     
    }
        
    //% shim=gamerpad::init
    function init(): void {
        return;
    }

    function PinInit(): void {        
        pins.setPull(DigitalPin.P13, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
        pins.setPull(DigitalPin.P15, PinPullMode.PullNone);        
        pins.setPull(DigitalPin.P16, PinPullMode.PullNone);

        pins.setPull(DigitalPin.P8, PinPullMode.PullNone);
        PIN_INIT = 1;
        return;
    }

    function JoyInit(): void {
        JOY_INIT = 1;
        return;
    }

    /**
     * To scan a button whether be triggered : return '1' if pressed; return'0' if not.
     */
    //% weight=70
    //% blockId=gamePad_keyState block="button|%button|is pressed"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=4
    export function keyState(button: GamerBitPin): boolean {
        if (!PIN_INIT) { 
            PinInit();
        }
        let num = false;
        if (0 == pins.digitalReadPin(<number>button)) {
            num = true;
        }
        return num;
    }

    /**
     * Registers code to run when a DFRobot gamer:bit event is detected.
     */
    //% weight=60
    //% blockGap=50
    //% blockId=gamePad_onEvent block="on button|%button|is|%event|"
    //% button.fieldEditor="gridpicker" button.fieldOptions.columns=4
    //% event.fieldEditor="gridpicker" event.fieldOptions.columns=3
    export function onEvent(button: GamerBitPin, event: GamerBitEvent, handler: Action) {
        init();
        if (!PIN_INIT) { 
            PinInit();
        }
        control.onEvent(<number>button, <number>event, handler); // register handler
    }
    
    /**
     * Registers code to run when a DFRobot joystick event is detected.
     */
    //% weight=60
    //% blockGap=50
    //% blockId=gamePad_onJoystickEvent block="on joystick is|%event|"
    //% event.fieldEditor="gridpicker" event.fieldOptions.columns=3
    export function onJoystickEvent(event: JoystickEvent, handler: Action) {
        init();
        if (!JOY_INIT) { 
            JoyInit();
        }
        control.onEvent(EventBusSource.MES_DPAD_CONTROLLER_ID, <number>event, handler); // register handler
    }

    /**
     * Vibrating motor switch.
     */
    //% weight=50
    //% blockId=gamePad_vibratorMotor block="Vibrator motor switch|%index|"
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    export function vibratorMotor(index: Vibrator): void {
        vibratorMotorSpeed(<number>index);
        return;
    }

    /**
     * Vibration motor speed setting, adjustable range 0~255.
     */
    //% weight=30
    //% blockGap=50
    //% blockId=gamePad_vibratorMotorSpeed block="Vibrator motor intensity|%degree|"
    //% degree.min=0 degree.max=255
    export function vibratorMotorSpeed(degree: number): void {
        if (!PIN_INIT) { 
            PinInit();
        }
        let num = degree * 4;
        pins.analogWritePin(AnalogPin.P12, <number>num);
        return;
    }
}
