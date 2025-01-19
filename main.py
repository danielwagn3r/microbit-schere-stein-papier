"""

Schütteln um ein zufälliges Bild auszusuchen

"""
"""

Knopf A um das Bild zu senden

"""
"""

Bild empfangen

"""
"""

Spiel zurücksetzen

"""

def on_received_number(receivedNumber):
    global hand_gegner
    if receivedNumber == 99:
        zurücksetzen()
    else:
        hand_gegner = receivedNumber
radio.on_received_number(on_received_number)

def zurücksetzen():
    global mein_eigen, hand_gegner, gesendet
    mein_eigen = 0
    hand_gegner = -1
    gesendet = 0

def on_button_pressed_a():
    global gesendet
    if gesendet == 0:
        radio.send_number(mein_eigen)
        gesendet = 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def anzeigeErgebnis():
    if mein_eigen == hand_gegner:
        basic.show_icon(IconNames.ASLEEP)
    elif mein_eigen == 1 and hand_gegner == 3:
        basic.show_icon(IconNames.HAPPY)
    elif mein_eigen == 2 and hand_gegner == 1:
        basic.show_icon(IconNames.HAPPY)
    elif mein_eigen == 3 and hand_gegner == 2:
        basic.show_icon(IconNames.HAPPY)
    else:
        basic.show_icon(IconNames.SAD)

def on_gesture_shake():
    global mein_eigen, gesendet
    mein_eigen = randint(1, 3)
    gesendet = 0
input.on_gesture(Gesture.SHAKE, on_gesture_shake)

def zeigeSSP():
    if mein_eigen == 1:
        basic.show_leds("""
            # # . . #
            # # . # .
            . . # . .
            # # . # .
            # # . . #
            """)
    elif mein_eigen == 2:
        basic.show_leds("""
            . . . . .
            . # # # .
            # # # # #
            . # # # .
            . . . . .
            """)
    elif mein_eigen == 3:
        basic.show_leds("""
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            """)
    else:
        basic.show_leds("""
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            """)

def on_button_pressed_ab():
    zurücksetzen()
    radio.send_number(99)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

gesendet = 0
mein_eigen = 0
hand_gegner = 0
radio.set_group(1)
zurücksetzen()

def on_forever():
    if gesendet == 1 and hand_gegner != -1:
        anzeigeErgebnis()
    else:
        zeigeSSP()
basic.forever(on_forever)
