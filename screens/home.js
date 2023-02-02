import { StyleSheet, Text, TextInput, View, Image,TouchableOpacity, Alert } from 'react-native';
import {NativeBaseProvider } from 'native-base';
import { Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import * as ROSLIB from 'roslib';

// const getFonts = () => Font.loadAsync({
//   'inter' : require('../assets/fonts/Raleway-VariableFont_wght.ttf'),
// });

class homePage extends Component{
  

    backHome = () => {
      this.props.navigation.navigate('home')
    }

    constructor(props) {
      super(props)
      this.state = {
        connected: false,
        error: undefined,
      }
    }

    connect = ()  => {
      this.ros = new ROSLIB.Ros({url: this.props.ipID})
      this.props.ros_node(this.ros)
      this.ros.on ('connection', () => {
        Alert.alert("Success","Connected to server: " + this.props.ipID)
        this.state.connected = true
        this.props.ros_connection(this.state.connected)
        this.props.navigation.navigate('joystick')
        this.ros.close()
      })
      this.ros.on ('error', (error) => {
        Alert.alert("Error","Type error: " + error)
        this.state.connected = false
        this.props.ros_connection(this.state.connected)
      })
      this.ros.on ('close', () => {
        this.state.connected = false
        this.props.ros_connection(this.state.connected)
      })
      
    }

    render() {

      return (
      <NativeBaseProvider>
        <View style={styles.AppContainer}>
        
        <View style={styles.upper}>
          
          <View style={styles.companyContainer}>
            <Text style={styles.agilex}>AGILEX</Text>
            <Text style={styles.robotics}>ROBOTICS</Text>
          </View>

          <View style={styles.optionscontainer}>
            
            <TouchableOpacity onPress={this.backHome} style={styles.home}>
              <Image source={require('../assets/home.png')} 
                style={{width: 25, height: 20}}/>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={""} style={styles.language}>
              <Image source={require('../assets/country/english.png')} 
                style={{width: 30, height: 20, marginRight:10}}/>
              <Text style={styles.languageName}> english</Text>
            </TouchableOpacity>

          </View>

        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>CONNECTION</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.backgroundContainer}>
          <TextInput style={styles.input} value={this.props.ipID} onChangeText={(ip) => this.props.ip_master(ip)}></TextInput>
            <Image source={require('../assets/wifi_g.png')} 
              style={{width: 20, height: 20, marginRight:15}}/>
          </View>
        </View>

        <View style={styles.conectButton}>
          <TouchableOpacity onPress={this.connect} style={styles.button}>
          <Image source={require('../assets/power/power.png')} 
            style={{width: 130, height: 130}}/>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
        <Image source={require('../assets/AgileX_.png')} 
          style={{width: 100, height: 100}}/>
        </View>
      
      </View>
      </NativeBaseProvider>
    );
  }  
}

const mapStateToProps = state => {
  return {
    ipID: state.ipID,
    portID: state.portID,
    rosID: state.rosID,
    rosconID: state.rosconID
  }
}

const styles = StyleSheet.create({

  AppContainer: {
    height: '100%',
  },

  upper: {
    height: '12%',
    backgroundColor: '#232323',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent:'space-between',
    borderRadius: 3,
  },

  companyContainer:{
    lineHeight: '50%',
    marginLeft:5,
    marginBottom:2,
  },

  optionscontainer:{
    flexDirection: 'row',
    marginRight:10,
    marginBottom:20,
    gap:10,
  },

  language:{
    flexDirection: 'row',
    marginRight:10,
  },

  languageName: {
    color: 'white',
  },

  home: {
    marginRight:20,
  },

  agilex: {
    fontSize: 25,
    fontWeight: '900',
    color: '#FDFDFD',
  },

  robotics:{
    fontSize : 25,
    fontWeight : '900',
    color : '#7A0303',
  },

  titleContainer: {
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
  },
  

  inputContainer: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 30,
    width: 320,
    height: 50,
    shadowOffset:{width:0, height:3},  
    shadowColor:'#000',  
    shadowOpacity:0.4,  
    shadowRadius:2,
    elevation:8  
  },

  input:{
    color: 'white',
    marginLeft:20,
    width: 255,
  },

  conectButton: {
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button :{
    width: 150,
    height: 150,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1E1E1',
    shadowOffset:{width:0, height:3},  
    shadowColor:'#000',  
    shadowOpacity:0.4,  
    shadowRadius:2,
    elevation:8  
  },

  footer: {
    height: '17%',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default connect(mapStateToProps,actions)(homePage)