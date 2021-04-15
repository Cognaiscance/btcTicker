import sys
import board
import digitalio
from PIL import Image, ImageDraw, ImageFont
import adafruit_ssd1306
from time import sleep

# Define the args
title_text = sys.argv[1]
scrolling_text = sys.argv[2]
night_mode = sys.argv[3] == "true"
scroll_speed = int(sys.argv[4])
font_size = int(sys.argv[5])

# Display Settings
WIDTH = 128
HEIGHT = 64
BGFILL = 0 if night_mode else 255
FGFILL = 255 if night_mode else 0

# Define I2c
i2c = board.I2C()
oled = adafruit_ssd1306.SSD1306_I2C(WIDTH, HEIGHT, i2c, addr=0x3C)
 
# Create blank image for drawing.
# Make sure to create image with mode '1' for 1-bit color.
image = Image.new("1", (oled.width, oled.height))
 
# Get drawing object to draw on image.
draw = ImageDraw.Draw(image)
 
# Draw a blank background
draw.rectangle((-1, -1, oled.width, oled.height), outline=BGFILL, fill=BGFILL)
 
#header font
hfont = ImageFont.truetype("fonts/AtariClassic-gry3.ttf", 10)

# Draw header text
draw.text(
    (5,2),
    title_text,
    font=hfont,
    fill=FGFILL,
)

# Load default font.
font = ImageFont.truetype("fonts/AtariClassicExtrasmooth-LxZy.ttf", font_size)
(font_width, font_height) = font.getsize(scrolling_text)
# scrolling once function
def scroll_once():
  scroll_distance = WIDTH
  while scroll_distance > -1 * font_width:
    # Draw scrolling text
    draw.text(
      (scroll_distance, 20),
      scrolling_text,
      font=font,
      fill=FGFILL,
    )
    
    # Display image
    oled.image(image)
    oled.show()

    sleep(0.0001)
    
    draw.rectangle(
      (-1, 15, oled.width, oled.height - 10),
      outline=BGFILL,
      fill=BGFILL,
    )

    sleep(0.0001)
    
    scroll_distance -= scroll_speed

scroll_once()