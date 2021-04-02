/**
 * User Buttons for DFRobot gamer:bit Players.
 */
//%
enum GamerBitPin {
    //% block="D-PAD up"
    P15 = DAL.MICROBIT_ID_IO_P15,
    //% block="D-PAD down"
    P13 = DAL.MICROBIT_ID_IO_P13,
    //% block="D-PAD left"
    P16 = DAL.MICROBIT_ID_IO_P16,
    //% block="D-PAD right"
    P14 = DAL.MICROBIT_ID_IO_P14,
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
 * Functions for DFRobot gamer:bit Players.
 */
//% weight=10 color=#DF6721 icon="\uf11b" block="gamePad"
namespace gamePad {
    let PIN_INIT = 0;
    
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
        PIN_INIT = 1;
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
