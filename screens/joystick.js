import { value } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import React,{useEffect,useState} from 'react';
import {View, StyleSheet,Dimensions,Text} from 'react-native';
import { Gesture,GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withSpring,
  runOnJS,
  withTiming,
} from 'react-native-reanimated';
import Speedometer from 'react-native-speedometer-chart'


function FunctionalComponent(props) {
    return <View collapsable={false}>{props.children}</View>;
}

const SIZE = 90;
const CIRCLE_RADIUS = SIZE *1.1

export default function Joystick({getData}) {

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    
    const context = useSharedValue({x:0,y:0});
    const x_ori = useSharedValue(0);
    const y_ori = useSharedValue(0);
    const angle = useSharedValue(0);
    const angleInfo = useSharedValue(0);
    const speed = useSharedValue(0);
    const speedX = useSharedValue(0);
    const speedY = useSharedValue(0);
    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const x_lim = useSharedValue(0);
    const y_lim = useSharedValue(0);


    const gesture = Gesture.Pan() 
        
        .onStart((event) => {
            context.value = {x: translateX.value, y: translateY.value};
            x_ori.value = event.absoluteX
            y_ori.value = event.absoluteY
            runOnJS(getData)(0,0,0,0)
        })

        .onUpdate((event) => {
            x.value =  event.absoluteX -x_ori.value
            y.value =   y_ori.value -event.absoluteY
            angle.value = Math.atan(y.value/x.value);
            angleInfo.value = Math.atan2(Math.trunc(translateY.value),Math.trunc(translateX.value));
            
            if (Math.sign(angleInfo.value) == -1){
                angleInfo.value = Math.round(-angleInfo.value * 180 / Math.PI);
            }
            else {
                angleInfo.value = Math.round(360 - angleInfo.value * 180 / Math.PI);
            }

            speed.value = -translateY.value

            x_lim.value = Math.abs(Math.cos(angle.value) *100)
            y_lim.value = Math.abs(Math.sin(angle.value) *100)

            translateX.value = Math.max(Math.min(event.translationX + context.value.x,x_lim.value),-x_lim.value);
            translateY.value = Math.max(Math.min(event.translationY + context.value.y,y_lim.value),-y_lim.value);
            

            runOnJS(getData)(translateX.value, -translateY.value,angleInfo.value,speed.value);
        })

        .onEnd(() => {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
            runOnJS(getData)(0,0,0,0)
        });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value},{ translateY: translateY.value}]
        }
    });

  return (
    <GestureDetector gesture={gesture}>
      <FunctionalComponent>
       

        <View style={styles.joystickContainer}>
            <View style={styles.circle}>
            <Animated.View style={[styles.box,rStyle] } />
            </View>
        </View>
      </FunctionalComponent>
    </GestureDetector>

  );
}


const styles = StyleSheet.create({
    

    infoContainer:{
        height: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    SpeedContainer:{
        alignItems: 'center',
    },

    AngleContainer:{
        alignItems: 'center',
    },

    joystickContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        height:CIRCLE_RADIUS *2,
        width: CIRCLE_RADIUS *2,
        backgroundColor: 'black',
        borderRadius: CIRCLE_RADIUS ,
    },

    box:{
        height: SIZE,
        width: SIZE,
        backgroundColor: 'grey',
        borderRadius: CIRCLE_RADIUS
    }
});
