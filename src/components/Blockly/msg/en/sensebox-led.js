export const LED = {
  senseBox_led: "LED connected to",
  senseBox_led_tip: "simple LED. Don't forget the resistor",

  senseBox_rgb_led: "RGB-LED",
  senseBox_rgb_led_tip: "RGB-LED",

  /**
   * WS2818 RGB LED
   */
  senseBox_ws2818_rgb_led: "Set RGB-LED at",
  senseBox_ws2818_rgb_led_init: "Initialise RGB LED (WS2818)",
  senseBox_esp32_ws2818_rgb_led: "Set RGB-LED (onBoard) at",
  senseBox_esp32_ws2818_rgb_led_init: "Initialise RGB LED (onBoard) ",
  senseBox_ws2818_rgb_led_position: "Position",
  senseBox_ws2818_rgb_led_brightness: "Brightness",
  senseBox_ws2818_rgb_led_tooltip:
    "Change the color of your RGB LED with this block. Link a block for the color. If multiple RGB LEDs are chained together you can use the position to determine which LED is controlled.",
  senseBox_ws2818_rgb_led_init_tooltip:
    "Connect the RGB LED to one of the three **digital/analog ports**. If multiple RGB LEDs are daisy-chained together you can determine which LED is controlled by position.",
  senseBox_ws2818_rgb_led_color: "Color",
  senseBox_ws2818_rgb_led_number: "Number",

  /**
   * Color
   */

  COLOUR_BLEND_COLOUR1: "colour 1",
  COLOUR_BLEND_COLOUR2: "colour 2",
  COLOUR_BLEND_HELPURL: "http://meyerweb.com/eric/tools/color-blend/",
  COLOUR_BLEND_RATIO: "ratio",
  COLOUR_BLEND_TITLE: "blend",
  COLOUR_BLEND_TOOLTIP:
    "Blends two colours together with a given ratio (0.0 - 1.0).",
  COLOUR_PICKER_HELPURL: "https://en.wikipedia.org/wiki/Color",
  COLOUR_PICKER_TOOLTIP: "Choose a colour from the palette.",
  COLOUR_RANDOM_HELPURL: "http://randomcolour.com",
  COLOUR_RANDOM_TITLE: "random colour",
  COLOUR_RANDOM_TOOLTIP: "Choose a colour at random.",
  COLOUR_RGB_BLUE: "blue",
  COLOUR_RGB_GREEN: "green",
  COLOUR_RGB_HELPURL: "http://www.december.com/html/spec/colorper.html",
  COLOUR_RGB_RED: "red",
  COLOUR_RGB_TITLE: "colour with",
  COLOUR_RGB_TOOLTIP:
    "Create a colour with the specified amount of red, green, and blue. All values must be between 0 and 255.",
  /**
     * LED-Matrix
     */


  senseBox_ws2812_rgb_matrix_init: "Initialise LED-Matrix",
  senseBox_ws2812_rgb_matrix_print: "Show text/number",
  senseBox_ws2812_rgb_matrix_text: "Input",
  senseBox_ws2812_rgb_matrix_init_tooltip: "",
  senseBox_ws2812_rgb_matrix_brightness: "Brightness: ",
  senseBox_ws2812_rgb_matrix_print_tooltip: "",
  senseBox_ws2812_rgb_matrix_autoscroll: "Auto-Scroll",
  senseBox_ws2812_rgb_matrix_draw_pixel: "Set pixels",
  senseBox_ws2812_rgb_matrix_x: "X",
  senseBox_ws2812_rgb_matrix_y: "Y",
  senseBox_ws2812_rgb_matrix_color: "Color",
  senseBox_ws2812_rgb_matrix_clear: "Clear matrix",
  senseBox_ws2812_rgb_matrix_clear_tooltip: "",
  senseBox_ws2812_rgb_matrix_draw_bitmap: "Draw bitmap",
  senseBox_ws2812_rgb_matrix_draw_bitmap_tooltip: "",
  senseBox_ws2812_rgb_matrix_bitmap: "Motive",
  senseBox_ws2812_rgb_matrix_bitmap_tooltip: "",
  senseBox_ws2812_rgb_matrix_custom_bitmap_tooltip: "",
  senseBox_ws2812_rgb_matrix_custom_bitmap: "Show custom bitmap",
  senseBox_ws2812_rgb_matrix_custom_bitmap_example: "{0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0xB5B6,   // 0x0010 (16) pixels\n" +
  "0x0000, 0x0000, 0x29B3, 0x29B3, 0x29B3, 0x0000, 0x0000, 0x0000, 0xB5B6, 0xB5B6, 0xE8E4, 0xB5B6, 0xE54F, 0xE54F, 0x29B3, 0x29B3," +  // 0x0020 (32) pixels"+
  "0x29B3, 0x74DA, 0x74DA, 0x74DA, 0xB5B6, 0xB5B6, 0xE8E4, 0xB5B6, 0x0000, 0xE54F, 0x29B3, 0x29B3, 0x29B3, 0x74DA, 0x74DA, 0x74DA,   // 0x0030 (48) pixels "+
  "0xB5B6, 0xB5B6, 0xE8E4, 0xB5B6, 0xE54F, 0xE54F, 0x29B3, 0x29B3, 0x29B3, 0x74DA, 0x0000, 0x0000, 0xB5B6, 0xB5B6, 0xE8E4, 0xB5B6,   // 0x0040 (64) pixels " +
  "0x0000, 0xE54F, 0x29B3, 0x29B3, 0x29B3, 0x74DA, 0x74DA, 0x74DA, 0xB5B6, 0xB5B6, 0xE8E4, 0xB5B6, 0xE54F, 0xE54F, 0x29B3, 0x29B3,   // 0x0050 (80) pixels"   +
  "0x29B3, 0x74DA, 0x74DA, 0x74DA, 0x0000, 0x0000, 0x0000, 0xB5B6, 0x0000, 0x0000, 0x29B3, 0x29B3, 0x29B3, 0x0000, 0x0000, 0x0000,   // 0x0060 (96) pixels}",

};
