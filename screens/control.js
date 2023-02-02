import { StyleSheet, Text, View, Image,TouchableOpacity,Pressable} from 'react-native';
import {NativeBaseProvider } from 'native-base';
import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import * as ROSLIB from 'roslib';
import Joystick from './joystick';
import Speedometer from 'react-native-speedometer-chart'
import DropDown from '../components/DropDown';

let Languages = [{id :1,name: "Francais",},{id :2,name: 'English'},{id :3,name: "Italiano",},{id :4,name: '中国'}]

function FunctionalComponent(props) {
    return <View collapsable={false}>{props.children}</View>;
  }

class joystick extends React.Component{


    backHome = () => {
        
        if (this.state.connected == true) {
            this.ros.close()
        }
        this.props.navigation.navigate('home')
    }

    constructor(props) {
      super(props)

      this.state = {
        connected: false,
        error: undefined,
        speed: 0,
        angleInfo: 0,
        angle: 0,
        x:0,
        z:0,
        button: false,
        pubInterval: null,
        pos: "#504f80",
        language : 'English',
      }
    }

    getData = (z,x,angle,speed) => {
        x = Math.trunc(x)/100
        z = Math.trunc(z)/100
        if (x !== NaN ){
            this.sendData(x,z,angle,speed)
        }
    }

    sendData = (x,z,angle,speed) => {
        this.state.x = x
        this.state.z = z
        if (Math.sign(speed) == -1) {
            this.state.pos = "#F0DF0F"
        }
        else{
            this.state.pos = "#504f80"
        }

        this.setState({speed: Math.abs(speed)})
        this.setState({angle: angle})
        // console.log('x: '+x,'z: '+z,'speed: '+speed,'angle: '+angle)
    }


    
    connect = ()  => {
      this.ros = new ROSLIB.Ros({url: this.props.ipID})
      this.props.ros_node(this.ros)
      this.ros.on ('connection', () => {
        this.state.connected = true
        this.props.ros_connection(this.state.connected)
        this.setState({ button: true })
        this.pubInterval = setInterval(this.move, 100)
      })
      this.ros.on ('error', (error) => {
        this.state.connected = false 
        this.props.ros_connection(this.state.connected)
      })
      this.ros.on ('close', () => {
        this.state.connected = false
        this.props.ros_connection(this.state.connected)
        clearInterval(this.pubInterval)
      })
      
    } 

    disconnect = ()  => {
        this.setState({ button: false })
        clearInterval(this.pubInterval)
        this.ros.close()
    }
    
    Topic_vel =() => {
        this.topic = new ROSLIB.Topic({
          ros: this.props.rosID,
          name:this.props.top_velID,
          messageType: 'geometry_msgs/Twist'
        })
      }
    
      move =() => {
        
        if (this.props.rosconID){
          this.message = new ROSLIB.Message({
            linear: {x: this.state.x, y: 0.0, z: 0.0},
            angular: {x: 0.0, y: 0.0, z: this.state.z }
          })
          this.Topic_vel()
          this.topic.publish(this.message)
        }
        
      }

      onSelect = (item) => {
        this.setState({ language: item})
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

                    <View style={styles.backHomeContainer}>
                    <TouchableOpacity onPress={this.backHome} style={styles.home}>
                            <Image source={require('../assets/home.png')} 
                                style={{width: 25, height: 20}}/>
                        </TouchableOpacity>
                    </View>
                        

                    <View style={styles.languageContainer}>
                    
                        <TouchableOpacity style={styles.language}>
                            {/* <Image source={require('../assets/country/english.png')} 
                                style={{width: 30, height: 20, marginRight:10}}/>
                            <Text style={styles.languageName}> english</Text> */}
                            <DropDown value={this.state.language} data={Languages} onSelect={this.onSelect}/>
                        </TouchableOpacity>

                    </View>
                    
                </View>

            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Control the robot with the Joystick !</Text>
            </View>

            <View style={styles.infoContainer}>
                
                <View style={styles.SpeedContainer}>
                    <Speedometer 
                        size={150}
                        value={this.state.speed} 
                        totalValue={100} 
                        showIndicator
                        internalColor= {this.state.pos} 
                        showLabels
                        labelStyle={{ color: 'green' }}
                        labelFormatter={number => `${number}%`}/>

                    <Text>Speed</Text>
                </View>
                
                <View style={styles.AngleContainer}>
                    <Speedometer
                        size={150} 
                        value={this.state.angle} 
                        totalValue={360} 
                        showIndicator 
                        internalColor="#7A0303" 
                        showLabels
                        labelStyle={{ color: '#7A0303' }}
                        labelFormatter={number => `${number}°`}/>
                    
                    <Text>Angle</Text>
                </View> 
                
            </View>

            <View style={styles.joystickContainer}>
               <View style={styles.handleContainer}>
                    <Joystick getData={this.getData}/>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable style={{paddingVertical: 12,
                    display: this.state.connected ? 'none' : 'flex',
                    paddingHorizontal: 40,
                    borderRadius: 10,
                    elevation: 3,
                    backgroundColor: this.state.button ? '#565454':'#7A0303'}}
                    onPress={() => {this.connect()}}>
                    
                        <Text style={styles.buttonText}>Start !</Text>

                </Pressable>

                <Pressable style={{paddingVertical: 12,
                    display: this.state.connected ? 'flex' : 'none',
                    paddingHorizontal: 40,
                    borderRadius: 10,
                    elevation: 3,
                    backgroundColor: '#565454'}}
                    onPress={() => {this.disconnect()}}>
                    
                        <Text style={styles.buttonText}>Stop !</Text>

                </Pressable>
                    
            </View>
        
        </View>

      </NativeBaseProvider>
    );
  }  
}

const styles = StyleSheet.create({

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
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginRight:10,
        marginBottom:20,
        gap:20,
        zIndex:2
    },

    languageContainer: {
        position: 'relative',
        zIndex: 1,
    },

    language:{
        flexDirection: 'row',
        marginRight:10,
        zIndex: 2,
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

    titleContainer:{
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
    },

    title:{
        fontSize: 23,
        zIndex: 1,
    },

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
        height: '35%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer:{
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',

    },

    buttonText:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

});

const mapStateToProps = state => {
    return {
      ipID: state.ipID,
      portID: state.portID,
      top_velID: state.top_velID,
      vrefID: state.vrefID,
      wrefID: state.wrefID,
      rosID: state.rosID,
      rosconID: state.rosconID
    }
  }

export default connect(mapStateToProps,actions)(joystick)