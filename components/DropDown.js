import { dataDetectorType } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";
import React,{Component,useState} from "react";
import {View,Text, StyleSheet,TouchableOpacity,Image, DeviceEventEmitter} from "react-native";

let Languages = [{id :1,name: "Francais",flag:require('../assets/country/french.png')},{id :2,name: 'English',flag:require('../assets/country/english.png')},{id :3,name: "Italiano",flag:require('../assets/country/Italy.png')},{id :4,name: '中国',flag:require('../assets/country/chinese.png')}]

const DropDown = ({
    
    data = [],
    value = {},
    onSelect = () => {},
    }) => {
    
    const [showOptions, setShowOptions] =useState(false)

    return (
        <View style={styles.slider}>
            
            <View style={styles.container}>
                
                <Image source={require('../assets/country/english.png')} 
                                        style={{width: 30, height: 20, marginRight:10,marginLeft:10}}/>
                
                <TouchableOpacity style={showOptions? styles.DropDown:styles.onDropDown} onPress={() => setShowOptions(!showOptions) }>
                    <Text style={styles.LanguageSelected}>{value}</Text>
                </TouchableOpacity>

            </View>
            
            
            { showOptions && (<View style={styles.options}>
                {Languages.map((val,i) => {
                    return(
                        <TouchableOpacity style={styles.optionsSelector} key={String(i)}>
                            <Image source={val.flag} 
                                style={{width: 30, height: 20, marginRight:10,marginLeft:10}}/>
                        </TouchableOpacity>
                    )
                })}
            </View>)}
        </View>
    )
};

const styles = StyleSheet.create({
    
    DropDown:{
        position: 'relative',
        zIndex: 1000,
    },

    DropDown: {
        position :'relative',
    },

    container:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },


    onDropDown:{
        position: 'relative',
        zIndex: 1000,
    },

    onLanguageSelected: {
        width : 20,
        color: 'white',
        textAlign:'center',
    },

    LanguageSelected: {

        width : 50,
        zIndex: 2,
        textAlign:'center',
        color: 'white',
    },

    optionsSelector:{
        zIndex: 2,
        height: 35
    },

    options:{
        paddingTop: 30,

        alignItems: 'center',
        position: 'absolute',
        width : 50,
        borderRadius:5,
        backgroundColor:'rgba(50,50,50,0.9)',
        
    },
    
    optionsText: {
        color: 'white',
        justifyContent: 'center',
        paddingTop: 5,
    },
});

export default DropDown;