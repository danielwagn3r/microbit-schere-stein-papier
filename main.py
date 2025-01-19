hand = 0

def on_gesture_shake():
    global hand
    hand = randint(1, 3)
    if hand == 1:
        basic.show_leds("""
            # # . . #
            # # . # .
            . . # . .
            # # . # .
            # # . . #
            """)
    elif hand == 2:
        basic.show_leds("""
            . . . . .
            . # # # .
            # # # # #
            . # # # .
            . . . . .
            """)
    elif hand == 3:
        basic.show_leds("""
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            """)
    else:
        pass
input.on_gesture(Gesture.SHAKE, on_gesture_shake)
