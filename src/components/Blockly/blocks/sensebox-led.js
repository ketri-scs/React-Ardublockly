import * as Blockly from 'blockly';
import { FieldSlider } from '@blockly/field-slider';
import { getColour } from '../helpers/colour'
import { selectedBoard } from '../helpers/board'


Blockly.Blocks['sensebox_rgb_led'] = {
    init: function () {
        this.setColour(getColour().sensebox);
        this.appendDummyInput()
            .appendField(Blockly.Msg.senseBox_rgb_led)
            .appendField("Pin:")
            .appendField(new Blockly.FieldDropdown(selectedBoard().digitalPins), "PIN")
        this.appendDummyInput()
            .appendField(Blockly.Msg.COLOUR_RGB_RED)//Blockly.Msg.senseBox_basic_red
            .appendField(new FieldSlider(255, 0, 255), "RED");
        this.appendDummyInput()
            .appendField(Blockly.Msg.COLOUR_RGB_GREEN)//Blockly.Msg.senseBox_basic_green
            .appendField(new FieldSlider(255, 0, 255), "GREEN");
        this.appendDummyInput()
            .appendField(Blockly.Msg.COLOUR_RGB_BLUE)//Blockly.Msg.senseBox_basic_green
            .appendField(new FieldSlider(255, 0, 255), "BLUE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.senseBox_rgb_led_tip);
        this.setHelpUrl('https://sensebox.de/books');
    }
};