{
  /* 
      <TouchableOpacity
        activeOpacity={0.7}
        hitSlop={hitSlop}
        onPress={onPressIconContainer}
        style={[
          styles.videoControlStyle,
          {height: isOreintation ? '100%' : '100%'},
        ]}>
        {showIcon && (
          <>
            {!isOreintation ? (
              <TouchableImage
                onPress={onPressBack}
                source={localeImage.back}
                imageStyle={[
                  styles.backImageStyle,
                  {
                    height: dynamicHieghtWidth,
                    width: dynamicHieghtWidth,
                  },
                ]}
                touchableStyle={[
                  styles.backButtonStyle,
                  {
                    top: isOreintation ? vh(20) : vh(10),
                    left: isOreintation ? vh(20) : vh(10),
                  },
                ]}
              />
            ) : null}
            <View style={styles.skipAndPausedStyle}>
              <TouchableImage
                onPress={_skipBackward}
                source={localeImage.skipBkrwd}
                imageStyle={[
                  styles.backImageStyle,
                  {
                    height: dynamicHieghtWidth,
                    width: dynamicHieghtWidth,
                  },
                ]}
              />
              {!isLoading && (
                <TouchableImage
                  onPress={_togglePlayPaused}
                  imageStyle={[
                    styles.backImageStyle,
                    {
                      height: dynamicHieghtWidth,
                      width: dynamicHieghtWidth,
                    },
                  ]}
                  source={paused ? localeImage.play : localeImage.pause}
                />
              )}
              <TouchableImage
                onPress={_skipForward}
                source={localeImage.skipFrwd}
                imageStyle={[
                  styles.backImageStyle,
                  {
                    height: dynamicHieghtWidth,
                    width: dynamicHieghtWidth,
                  },
                ]}
              />
            </View>
            <Slider
              minimumValue={0}
              tapToSeek={true}
              value={currentTime}
              maximumValue={duration}
              thumbTintColor={Colors.white}
              onSlidingStart={onSlidindStart}
              maximumTrackTintColor={Colors.white}
              minimumTrackTintColor={Colors.tabColor}
              style={[
                styles.sliderStyle,
                {
                  bottom: isOreintation ? vh(20) : vh(5),
                },
              ]}
              onSlidingComplete={_onSlidingComplete}
            />
            <Text
              style={[
                styles.timeStyleText,
                {
                  left: isOreintation ? vw(40) : vw(16),
                  bottom: isOreintation
                    ? vw(20)
                    : Platform.OS == 'android'
                    ? vw(10)
                    : vh(15),
                },
              ]}>
              {getTime()}
            </Text>
            <TouchableOpacity
              hitSlop={hitSlop}
              onPress={handleOreinTation}
              style={[
                styles.fullNexitIconStyle,
                {
                  bottom: isOreintation
                    ? vh(20)
                    : Platform.OS == 'android'
                    ? vh(8)
                    : vh(15),
                  right: isOreintation ? vh(40) : vh(15),
                },
              ]}>
              <Image
                style={styles.fullScreenImageStyle}
                source={localeImage.fullScreen}
              />
            </TouchableOpacity>
          </>
        )}
      </TouchableOpacity> */
}
