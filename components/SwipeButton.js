import React, { useState } from 'react';
import { View, Animated, PanResponder, StyleSheet } from 'react-native';
import { DEFAULT_BORDER_RADIUS, DEFAULT_COMPLETE_THRESHOLD_PERCENTAGE, DEFAULT_GO_BACK_TO_START, DEFAULT_HEIGHT, DEFAULT_WIDTH } from './constants';
import { SwipeButtonCircle } from './SwipeButtonCircle';
import SwipeButtonText from './SwipeButtonText';
export const SwipeButton = ({ height = DEFAULT_HEIGHT, width = DEFAULT_WIDTH, borderRadius = DEFAULT_BORDER_RADIUS, title, titleContainerProps, titleProps, titleContainerStyle, titleStyle, completeThresholdPercentage = DEFAULT_COMPLETE_THRESHOLD_PERCENTAGE, underlayStyle, disabled, Icon, containerStyle, circleBackgroundColor, goBackToStart = DEFAULT_GO_BACK_TO_START, onComplete, onSwipeEnd = () => { }, onSwipeStart = () => { }, }) => {
    const [endReached, setEndReached] = useState(false);
    const opacity = disabled ? 0.5 : 1;
    const opacityStyle = { opacity };
    const [translateX] = useState(new Animated.Value(0));
    const scrollDistance = width - (completeThresholdPercentage / 100) - height;
    const completeThreshold = scrollDistance * (completeThresholdPercentage / 100);
    const animateToStart = () => {
        Animated.spring(translateX, { toValue: 0, tension: 10, friction: 5, useNativeDriver: false }).start();
        return setEndReached(false);
    };
    const animateToEnd = () => {
        onComplete();
        Animated.spring(translateX, { toValue: scrollDistance, tension: 10, friction: 5, useNativeDriver: false }).start();
        if (goBackToStart) {
            setEndReached(true);
            return animateToStart();
        }
        return setEndReached(true);
    };
    const onMove = (_, gestureState) => {
        if (disabled) {
            return false;
        }
        if (gestureState.dx < 0 || gestureState.dx > scrollDistance) {
            return Animated.event([{ dx: translateX }], { useNativeDriver: false })(Object.assign(Object.assign({}, gestureState), { dx: gestureState.dx < 0 ? 0 : scrollDistance }));
        }
        return Animated.event([{ dx: translateX }], { useNativeDriver: false })(gestureState);
    };
    const onRelease = () => {
        if (disabled) {
            return;
        }
        if (endReached) {
            return animateToStart();
        }
        const isCompleted = translateX._value >= completeThreshold;
        return isCompleted
            ? animateToEnd()
            : animateToStart();
    };
    const panResponser = () => PanResponder.create({
        onPanResponderGrant: onSwipeStart,
        onPanResponderEnd: onSwipeEnd,
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => false,
        onPanResponderMove: onMove,
        onPanResponderRelease: onRelease,
    });
    return (React.createElement(View, { style: [
            styles.container,
            opacityStyle,
            containerStyle,
            { height, width, borderRadius },
        ] },
        React.createElement(SwipeButtonText, { title: title, titleStyle: titleStyle, titleProps: titleProps, height: height, titleContainerProps: titleContainerProps, titleContainerStyle: titleContainerStyle }),
        !disabled && React.createElement(Animated.View, { testID: "Underlay", style: [
                styles.underlayContainer,
                underlayStyle,
                {
                    width: translateX.interpolate({ inputRange: [0, 100], outputRange: [31, 131] }),
                    height,
                },
            ] }),
        React.createElement(SwipeButtonCircle, { circleBackgroundColor: circleBackgroundColor, Icon: Icon, opacity: opacity, panHandlers: panResponser().panHandlers, translateX: translateX, borderRadius: borderRadius, height: height })));
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignSelf: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    underlayContainer: {
        position: 'absolute',
        backgroundColor: '#152228',
    },
});
