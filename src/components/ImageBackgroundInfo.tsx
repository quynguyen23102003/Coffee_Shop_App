import { StyleSheet, Text, View, ImageProps, ImageBackground, TouchableOpacity, BackHandler } from 'react-native'
import React from 'react'
import GradientBGIcon from './GradientBGIcon';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';

interface ImageBackgroundinfoProps {
    EnableBackhandler: boolean;
    imagelink_portrait: ImageProps;
    type: string;
    id: string;
    favourite: boolean;
    name: string;
    special_ingreidient: string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    BackHandler?: any;
    ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundinfoProps> = ({ ...props }) => {
    return (
        <View>
            <ImageBackground
                source={props.imagelink_portrait}
                style={styles.ItemImageBackground}>
                {props.EnableBackhandler ?
                    (
                        <View style={styles.ImageHeaderBarContainerWithBack}>
                            <TouchableOpacity onPress={() => {props.BackHandler();}}>
                                <GradientBGIcon
                                    name='left'
                                    color={COLORS.primaryLightGreyHex}
                                    size={FONTSIZE.size_16} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {props.ToggleFavourite(props.favourite, props.type, props.id);}}>
                            <GradientBGIcon
                                    name='like'
                                    color={props.favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
                                    size={FONTSIZE.size_16} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.ImageHeaderBarContainerWithoutBack}>
                            <TouchableOpacity onPress={() => {props.ToggleFavourite(props.favourite, props.type, props.id);}}>
                            <GradientBGIcon
                                    name='like'
                                    color={props.favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex}
                                    size={FONTSIZE.size_16} />
                            </TouchableOpacity>
                        </View>
                    )
                }
            </ImageBackground>
        </View>
    )
}

export default ImageBackgroundInfo

const styles = StyleSheet.create({
    ItemImageBackground: {
        width: '100%',
        aspectRatio: 20 / 25,
        justifyContent: 'space-between'
    },
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ImageHeaderBarContainerWithoutBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})