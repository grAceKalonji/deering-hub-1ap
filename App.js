import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  Alert,
  Animated,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Linking,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  DevSettings
} from 'react-native';


import { WebView } from 'react-native-webview';
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import homepage from './assets/DeeringHomp.png';
import DLogo from './DeeringLogo.png';
import abtpage from './assets/About_page.png';
import menupage from './assets/Mu_page.png';
import LangCS from './assets/Lang_cs.png';
import instructioons from './assets/Images/menuInstructions.png';
import instructioons1 from './assets/Images/homePageInstructions.png';
import instructioons2 from './assets/Images/navigationInstruction.png';
import TipsCSS from './assets/Images/TipsCs.png';
import SecureScreen from './assets/securityscreen.png';



//prefetching to make the images potentially load faster 
Image.prefetch(homepage);
Image.prefetch(abtpage);
Image.prefetch(menupage);
Image.prefetch(LangCS);
Image.prefetch(instructioons);
Image.prefetch(instructioons1);
Image.prefetch(instructioons2);
Image.prefetch(TipsCSS);
Image.prefetch(SecureScreen);



const SchoolCodeInputScreen = ({ navigation }) => {
  const [schoolCode, setSchoolCode] = useState('');

  useEffect(() => {
    // Check if the school code has already been saved
    const checkSchoolCode = async () => {
      const savedCode = await AsyncStorage.getItem('schoolCode');
      if (savedCode === 'GYATT123') {
        // Navigate to the next screen if code is valid
        navigation.navigate('Splash');
      }
    };
    checkSchoolCode();
  }, []);

  const handleCodeSubmit = async () => {
    // Validate the school code
    if (schoolCode === 'GYATT123') {
      // Save the school code to AsyncStorage
      await AsyncStorage.setItem('schoolCode', schoolCode);
      navigation.navigate('Splash');
    } else {
      Alert.alert('Invalid School Code', 'There is no school with the entered code. Get the correct school code from your school.');
    }
  };


  return (
    <ImageBackground
      source={SecureScreen}
      style={styles.backgroundImage}
      resizeMode="cover">
    <View style={styles.container1}>
    
    <Text style = {styles.menuTitles4}> 
    Welcome to your Hub
    </Text>
    <View style={styles.horizontalLine3} />
      <TextInput
        style={styles.input}
        placeholder="Enter School Code"
        value={schoolCode}
        onChangeText={setSchoolCode}
      />
      <Button title="Submit" onPress={handleCodeSubmit} />
     </View>
    
    </ImageBackground >
  );
};


//logo screen... splash screen
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('About');
    }, 2200); // 2.2 seconds delay

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={menupage}
      style={styles.backgroundImage}
      resizeMode="cover">
    
    <View style={styles.splashContainer}>
      <Image source={homepage} style={styles.logo} />
    </View>

    </ImageBackground >
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <WebView
        source={{ uri: 'https://dhs.portlandschools.org/' }}
        style={{ flex: 1 }} // Ensure the WebView fills the available space
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('MenuScreen')}
        style={styles.floatingButton}>
        <Ionicons name="menu" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

// Placeholder for other screens
const ICScreen = ({ navigation }) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <WebView
        source={{
          uri: 'https://ic.portlandschools.org/campus/portal/students/portland.jsp',
        }}
        style={{ flex: 1 }} // Ensure the WebView fills the available space
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('MenuScreen')}
        style={styles.floatingButton}>
        <Ionicons name="menu" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

// this is what the Orange passes screen will display.
const OrangePassScreen = ({ navigation }) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <WebView
        userAgent="Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
        source={{
          uri: 'https://orangepasses.com/',
        }}
        style={{ flex: 1 }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('MenuScreen')}
        style={styles.floatingButton}>
        <Ionicons name="menu" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const TaskScreen = ({ navigation }) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <WebView
        source={{ uri: 'https://classroom.google.com/?emr=0&pli=1' }}
        style={{ flex: 1 }} // Ensure the WebView fills the available space
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('MenuScreen')}
        style={styles.floatingButton}>
        <Ionicons name="menu" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};
  
// About screen code
const AboutScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleNextPress = async () => {
    setLoading(true);

    try{
      // Check if NaInScreen has been shown
      const hasShownNaInScreen = await AsyncStorage.getItem('hasShownNaInScreen');
      // Check if InstructionScreen has been shown
      const hasShownInstructionScreen = await AsyncStorage.getItem('hasShownInstructionScreen');
      // Check if HpInScreen has been shown
      const hasShownHpInScreen = await AsyncStorage.getItem('hasShownHpInScreen');

      // Determine which screen to navigate to based on checks
      if (!hasShownNaInScreen) {
        navigation.navigate('NaInScreen');
      } else if (!hasShownInstructionScreen) {
        navigation.navigate('InstructionScreen');
      } else if (!hasShownHpInScreen) {
        navigation.navigate('HpInScreen');
      } else {
        // If all screens have been shown, navigate to HomeScreen
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error checking screens:', error);
    }

      setLoading(false); // Stop the loader once navigation is done
    };


  return (
    <ImageBackground
      source={abtpage}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.aboutContainer}> 
        <Text style={styles.aboutText}>About the App</Text>
        <Text style={styles.aboutscreentext}>
          {'Deering Hub simplifies school life by \n'}
          {
            'bringing all Deering School resources into one easy-to-use app. Designed with our diverse student body in mind, it includes multilingual video tutorials to help non-English speakers navigate school life with ease.\n'
          }
          {
            "From accessing the school's website to exploring student portals and classroom tools, Deering Hub makes it all accessible at your fingertips.\n"
          }
          {
            'Its user-friendly interface, complete with a bottom navigation bar \n'
          }
          {'ensures quick access to essential features.\n'}
          {
            "Deering Hub is more than an app; it's a tool to bridge language barriers and assist every Deering student in their educational journey."
          }
          </Text>

{loading ? (
  // Show the loading spinner when loading is true
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="purple" />
    <Text>Loading...</Text>
  </View>
) : (
  // Show the button when not loading
  <TouchableOpacity style={styles.button1} onPress={handleNextPress}>
    <Text style={styles.buttonText}>Next</Text>
  </TouchableOpacity>
)}
</View>
</ImageBackground>
);
};

const openInstagram = () => {
  Linking.openURL('https://www.instagram.com/deering_hs/'); // Replace with your Instagram URL
};


const MenuScreen = ({ navigation }) => {
  return (

    <ImageBackground
      source={menupage}
      style={styles.backgroundImage}
      resizeMode="cover">
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.menuTitles1}> More from Deering </Text>
      <View style={styles.horizontalLine3} />


      <View style= {styles.frame}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Lost')}
         >
        <Text>
          <Text style={styles.mbuttonText}>New to Deering?</Text>
          {'\n'} {/* New line */}
          <Text style={styles.descriptionText}>
            Get some Tips and tricks from current Deering students.
          </Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine} />

      <TouchableOpacity
        onPress={() => navigation.navigate('Resources')}
         >
        <Text>
          <Text style={styles.mbuttonText}>Go to Resources</Text>
          {'\n'} {/* New line */}
          <Text style={styles.descriptionText}>
            You'll find video tutorials that show how to use all Deering
            resources.
          </Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine} />

      <TouchableOpacity
        onPress={() => navigation.navigate('CQScreen')}
         >
        <Text>
          <Text style={styles.mbuttonText}>Course Quiz</Text>
          {'\n'} {/* New line */}
          <Text style={styles.descriptionText}>
            Are you interested in a course? Well, learn more about it and see if
            it's the right choice for you.
          </Text>
        </Text>
      </TouchableOpacity>

      </View>


      <TouchableOpacity
      onPress={openInstagram}
      >
      <View style = {{flexDirection: "row", paddingTop: 20, alignItems: 'center'}}>
        <Ionicons name="logo-instagram" size={24} color="purple"/>
          <Text style = {styles.descriptionText1}>
            Follow us on Instagram !!
          </Text>
      </View>
      </TouchableOpacity>
      
    </ImageBackground>
  );
};


// This data is for the cards 
const data = [
  { id: '1', title: 'Science', description: 'Are you passionate about science? Join like-minded individuals at Science Olympiad But be ready for a challenge.' },
  { id: '2', title: 'Math', description: 'Love crunching numbers? Math Club might be the perfect place for you.' },
  { id: '3', title: 'Social', description: 'Want to meet new people, go to Mr Jellisons class at room 119.' },
  { id: '4', title: 'Lunch', description: 'Not feeling school lunch? go to quality store up the road at 473 Stevens Ave.' },
  { id: '5', title: 'Academic', description: 'Dont take pre calculus go straight to calculus. you will learn so much more.' },
  { id: '6', title: 'Social', description: 'Youll have a good chance of making friends if you go to Ms Noors office during lunch.' },
  { id: '7', title: 'Social', description: 'Subscribe to Deerings youtube to watch live sports.' },
  { id: '8', title: 'social', description: 'Join something, ANYTHING!! club or activity you will enjoy it and weve got a large selection of things to join. Clubs are the best department' },
  { id: '9', title: 'Sport', description: 'Stay active join a sports. you will definitely make a friends' },
  // Add more items here
];

const handlePress = () => {
  Linking.openURL('mailto:258625@portlandschools.org');
}; 

const { width } = Dimensions.get('window');
// this is the Are you lost place
const TipsScreen = ({ navigation }) => {


  const renderItem = ({ item }) => (
    <View
      style={[styles.card]} // Randomly varies the height for the staggered effect
      >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </View>
  );
  const ListFooter = () => (
    <TouchableOpacity style={styles.footerContainer} onPress={handlePress}>
      <Text style= {[styles.descriptionText1, {paddingTop: 8, paddingBottom: 8}]}>
        {'Would you like to suggest something? \n'}
        {'Send an email to 258625@portlandschools.org \n'}
      </Text>
    </TouchableOpacity>
  );
 

  return (
    <ImageBackground
      source={TipsCSS}
      style={styles.backgroundImage}
      resizeMode="cover">
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
      <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      
      <View> 
      <Text style={styles.menuTitles1} >Tips and tricks</Text>
      </View>

      <View style={{ flex: 1, marginTop: 80, zindex: 20}}>
        <Text style={styles.menuTitles3}>Some Tips</Text>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          ListFooterComponent={ListFooter}
          contentContainerStyle={styles.listContainer}
        />
       
        
      </View>
    </ImageBackground>
  );
};

// screen holding all the language tutorials
const ResourcesScreen = ({ navigation }) => {

  const resetApp = async () => {
    try {
      await AsyncStorage.clear(); // Clear all stored data
      DevSettings.reload(); // Force a reload of the app
    } catch (e) {
      console.error('Failed to reset the app:', e);
    }
  };
  
  return (
    <ImageBackground
      source={menupage}
      style={styles.backgroundImage}
      resizeMode="cover">
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      






      <TouchableOpacity
        style={styles.killSwitch}
        onPress={resetApp}
      >
        <Ionicons name="heart" size={25} color="white" />
      </TouchableOpacity>








      
      
      <View>
      <Text style={styles.menuTitles3}> Resources </Text>
      </View>

      <View style={styles.horizontalLine3} />

      <View style ={{alignContent: "center"}}> 
      <TouchableOpacity
        onPress={() => navigation.navigate('ICVScreen')}
         >
        <Text>
          <Text style={styles.qbuttonText}> Infinite Campus</Text>
          {'\n'} {/* New line */}
          <Text style={styles.descriptionText2}>
            Learn all the tips and tricks of Infinte campus.
          </Text>
        </Text>
      </TouchableOpacity>

      <View style = {{alignItems: 'center'}}>
      <View style={styles.horizontalLine5} />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('OPVScreen')}
         >
        <Text>
          <Text style={styles.qbuttonText}>Orange Pass</Text>
          {'\n'} {/* New line */}
          <Text style={styles.descriptionText2}>
            What is orange pass? Learn to use orange pass.
          </Text>
        </Text>
      </TouchableOpacity>
 
      <View style = {{alignItems: 'center'}}>
      <View style={styles.horizontalLine5} />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('GCVScreen')}
         >
        <Text>
          <Text style={styles.qbuttonText}>Google Classroom</Text>
          {'\n'} {/* New line */}
          <Text style={styles.descriptionText2}>
            How do Deering students use Google Classroom. Learn here.
          </Text>
        </Text>
      </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const ICVScreen = ({ navigation }) => {

  const videoIds = {
    English: '4um2xM70KwA', // Example video ID for English
    French: 'ExO8oG_lUwE', // Add actual video ID for French
    Portuguese: '88j6oU08Nh0', // Add actual video ID for Portuguese
    Lingala: '4um2xM70KwA', // Add actual video ID for Lingala
    Somali: 'ExO8oG_lUwE', // Add actual video ID for French
  };

  const openVideo = (language) => {
    const videoId = videoIds[language];
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    navigation.navigate('VideoScreen', { videoUrl });
  };

  return (
    <ImageBackground
      source={LangCS}
      style={styles.backgroundImage}
      resizeMode="cover">
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.mtfResources}> Infinite Campus </Text>
      <Text style={styles.descriptionText2}>
            (Select the language for your video tutorial.) 
          </Text>
      <View style={styles.horizontalLine3} />

      <TouchableOpacity
        onPress={() => openVideo('English')}
         >
        <Text style={styles.qbuttonText}> English</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />

      <TouchableOpacity
        onPress={() => openVideo('Portuguese')}
         >
        <Text style={styles.qbuttonText}> Portuguese</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />



      <TouchableOpacity
        onPress={() => openVideo('French')}
         >
        <Text style={styles.qbuttonText}> French</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />

      <TouchableOpacity
        onPress={() => openVideo('Lingala')}
         >
        <Text style={styles.qbuttonText}> Lingala</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />

      <TouchableOpacity
        onPress={() => openVideo('Somali')}
         >
        <Text style={styles.qbuttonText}> Somali</Text>
      </TouchableOpacity>

    </ImageBackground>
  );
};

const OPVScreen = ({ navigation }) => {
  const videoIds = {
    English: 'qFnVs2CbivE', // Example video ID for English
    French: 'RqpAFtXNQyo', // Add actual video ID for French
    Portuguese: 'RqpAFtXNQyo', // Add actual video ID for Portuguese
    Lingala: 'qFnVs2CbivE', // Add actual video ID for Lingala
    Somali: 'ExO8oG_lUwE', // Add actual video ID for Somali
  };

  const openVideo = (language) => {
    const videoId = videoIds[language];
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    navigation.navigate('VideoScreen', { videoUrl });
  };

  return (
    <ImageBackground
      source={LangCS}
      style={styles.backgroundImage}
      resizeMode="cover">
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.mtfResources}> Orange Pass </Text>
      <Text style={styles.descriptionText2}>
            (Select the language for your video tutorial.) 
          </Text>
      <View style={styles.horizontalLine3} />

      <TouchableOpacity
        onPress={() => openVideo('English')}
         >
        <Text style={styles.qbuttonText}> English</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />

      <TouchableOpacity
        onPress={() => openVideo('Portuguese')}
         >
        <Text style={styles.qbuttonText}> Portuguese</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />



      <TouchableOpacity
        onPress={() => openVideo('French')}
         >
        <Text style={styles.qbuttonText}> French</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />

      <TouchableOpacity
        onPress={() => openVideo('Lingala')}
         >
        <Text style={styles.qbuttonText}> Lingala</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />

      <TouchableOpacity
        onPress={() => openVideo('Somali')}
         >
        <Text style={styles.qbuttonText}> Somali</Text>
      </TouchableOpacity>

    </ImageBackground>
  );
};

const GCVScreen = ({ navigation }) => {
  const videoIds = {
    English: 'hkTzXVh11pQ', // Example video ID for English
    French: 'NCSB6OsGvno', // Add actual video ID for French
    Portuguese: '0_0Ypx-Ix4M', // Add actual video ID for Portuguese
    Lingala: 'hkTzXVh11pQ', // Add actual video ID for Lingala
    Somali: 'ExO8oG_lUwE', // Add actual video ID for French
  };

  const openVideo = (language) => {
    const videoId = videoIds[language];
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    navigation.navigate('VideoScreen', { videoUrl });
  };

  return (
    <ImageBackground
      source={LangCS}
      style={styles.backgroundImage}
      resizeMode="cover">
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.mtfResources}> Google Classroom </Text>
      <Text style={styles.descriptionText2}>
            (Select the language for your video tutorial.) 
          </Text>
      <View style={styles.horizontalLine3} />

      <TouchableOpacity
        onPress={() => openVideo('English')}
         >
        <Text style={styles.qbuttonText}> English</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />

      <TouchableOpacity
        onPress={() => openVideo('French')}
         >
        <Text style={styles.qbuttonText}> French</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />

      <TouchableOpacity
        onPress={() => openVideo('Portuguese')}
         >
        <Text style={styles.qbuttonText}> Portuguese</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />

      <TouchableOpacity
        onPress={() => openVideo('Lingala')}
         >
        <Text style={styles.qbuttonText}> Lingala</Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />

      <TouchableOpacity
        onPress={() => openVideo('Somali')}
         >
        <Text style={styles.qbuttonText}> Somali</Text>
      </TouchableOpacity>

    </ImageBackground>
  );
};

const CQScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={LangCS}
      style={styles.backgroundImage}
      resizeMode="cover">
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      
      <Text style={styles.menuTitles3}> Course Quiz</Text>
      <View style = {{alignItems: 'center'}}>
      <View style={styles.horizontalLine5} />
      </View>
      <View style={styles.horizontalLine3} />
      <TouchableOpacity
        onPress={() => navigation.navigate('APPSScreen')}
         >
        <Text>
          <Text style={styles.qbuttonText}> Ap Physics </Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />

      <TouchableOpacity
        onPress={() => navigation.navigate('APBiologyScreen')}
         >
        <Text>
          <Text style={styles.qbuttonText}> Ap Biology</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />

      <TouchableOpacity
        onPress={() => navigation.navigate('APCompSciSScreen')}
         >
        <Text>
          <Text style={styles.qbuttonText}> Ap Computer science </Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.horizontalLine2} />
      <View style={styles.horizontalLine2} />

      <TouchableOpacity
          onPress={handlePress}
          style = {{marginTop:  100}}
         >
        <Text>
          <Text style={styles.zbuttonText}> (Tell me about a class that you want more information about and I will add it. 258625@portlandschools.org ) </Text>
        </Text>
      </TouchableOpacity>

      

    </ImageBackground>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const APCompSciSScreen = ({ navigation }) => {


  const videoUrl = `https://www.youtube.com/watch?v=ix1oFYmvFPA`; // Mr Borlland

  return (
    <View style={{ flex: 1 }}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Conditional Video Display */}
      {
        <WebView
          source={{ uri: videoUrl }}
          style={{ flex: 1, marginBottom: 0 }}
          allowsFullscreenVideo={true}
          javaScriptEnabled={true}
        />
      }

      {/* Scrollable Content */}
      <ScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
      >

        <View style={styles.descriptionContainer1}>
        <View style={styles.courseQuizframe}>
        
          <View style={styles.qqhorizontalspaceabove} />
          <Text style={[styles.menuTitles, {margintop: 100, textAlign: "center"} ]}> AP Computer Science </Text>
          <View style={styles.qqhorizontalspacebelow} />
          <Text style={styles.descriptionText3}>
            {' '}
            Students will continue exploring the concepts introduced in Intro to Computer Programming and prepare to take
            the Advanced Placement exam in Computer Science. Successful completion of the exam will earn college credit at most
            colleges. In this class the pace will be quick and the work will be extensive, similar to a college setting. Class time will
            be split between lecture and hands-on applications on the computer. We will cover object-oriented methodology with an emphasis on
            problem solving and algorithms. This class is excellent for those wishing to pursue a STEM (science, technology, engineering or math)
            career and also those who enjoy logical problem solving. After the AP exam, students will have time to explore cutting-edge technologies,
            such as mobile phone programming, electronics, or web development.
          </Text>
          </View>
          
          <View style={styles.horizontalLine3} />

          <Text style={styles.courseQuizTitleText}> Opinions from other students </Text>
          <View style={styles.horizontalLine3} />

          <TouchableOpacity
            style={styles.reviewCard}
            onPress={() => {
              /* navigation or action here */
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={DLogo} style={styles.previewImage} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.reviewerName}>Grace Kalonji.</Text>
                <Text style={styles.reviewDate}>February 20, 2024</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Highly recommend for anyone interested in science. Mr Borllands comitment to helping students understand the work as well as his
              teaching style make the class very engaging. I really enjoyed learning how to code. the challenge is definitely there. beyond coding i think that computer science teaches you how to think about problems alot differently. i would highly suggest this class. be ready to work and practice regularly."

            </Text>
          </TouchableOpacity>
          <View style={styles.horizontalLine1} />

          <View style={styles.horizontalLine} />

          <TouchableOpacity
            style={styles.reviewCard}
            onPress={() => {
              /* navigation or action here */
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={DLogo} style={styles.previewImage} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.reviewerName}>Kiese L.</Text>
                <Text style={styles.reviewDate}>March 10, 2024</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Taking AP Computer Science was like unlocking a new level for me.
              Before, coding was just something I heard about, but now, I feel like I can
              actually create stuff. It's a class where you really get to see your ideas come
              to life. Yes, it gets tricky. Debugging can be a headache, and you definitely
              need to dedicate time outside class to get your projects done. For me, it was
              about three hours a week, sometimes more before big projects were due. But when
              you finally solve a problem you've been stuck on? Best feeling ever. Plus, I've got
              skills now that I can use in the future. Totally worth it if you're curious about
              how apps and websites work."
            </Text>
          </TouchableOpacity>
          <View style={styles.horizontalLine3} />
        </View>
      </ScrollView>

    </View>
  );
};

const APPSScreen = ({ navigation }) => {


  const videoUrl = `https://www.youtube.com/shorts/wXoZi6B4-w0`; // Mr Davenport 's introductory lecture
  return (
    <View style={{ flex: 1 }}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Conditional Video Display */}
      {
        <WebView
          source={{ uri: videoUrl }}
          style={{ flex: 1, marginBottom: 0 }}
          allowsFullscreenVideo={true}
          javaScriptEnabled={true}
        />
      }

      {/* Scrollable Content */}
      <ScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
      >

        <View style={styles.descriptionContainer1}>
        <View style={styles.courseQuizframe}>


          <View style={styles.qqhorizontalspaceabove} />
          <Text style={[styles.menuTitles, {margintop: 100, textAlign: "center"} ]}>AP Physics</Text>
          <View style={styles.qqhorizontalspacebelow} />
          <Text style={styles.descriptionText3}>
            {' '}
            This course emphasizes the concepts of physics with reliance on
            critical thinking and problem solving activities. Students will
            continue their study in lab-based sciences and learn and understand
            the rules that govern the physical world. This course is designed to
            increase students’ physics literacy in quantitative analysis of
            phenomenon, motion, mechanics, and energy. Students planning careers
            in science, engineering or health are encouraged to take Ap
            Physics.
          </Text>
          </View>
          <View style={styles.horizontalLine3} />

          <Text style={styles.courseQuizTitleText}> Opinions from other students </Text>
          <View style={styles.horizontalLine3} />

          <TouchableOpacity
            style={styles.reviewCard}
            onPress={() => {
              /* navigation or action here */
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={DLogo} style={styles.previewImage} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.reviewerName}>Emma M.</Text>
                <Text style={styles.reviewDate}>February 23, 2024</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "if you enjoy physics then you will definitely find this course valuable. Mr davenport has a really good teching style, its a lecture note structure with supplimental notes. how to succeed: be good algebra or get wreckd!. if youre strugling and you dont speak for yoursself you will find it very difficult. there is alot of support from the teacher. basically if youre willing to work, YOU WILL SUCCEED. "

            </Text>
          </TouchableOpacity>
          <View style={styles.horizontalLine1} />

          <View style={styles.horizontalLine} />

          <TouchableOpacity
            style={styles.reviewCard}
            onPress={() => {
              /* navigation or action here */
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={DLogo} style={styles.previewImage} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.reviewerName}>Cody Z.</Text>
                <Text style={styles.reviewDate}>febuary 23, 2024</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Mr Davenport was always able to extend his helping hand, I found physics as a very interesting course and despite the fact that it was a challenging class, overall with all the help that i got and the class environment i would 100% recommend this class to anyone thinking about going into stem. i do also suggest looking through what you learnt regularly as all these concepts end up becomming very confusing and without practice youre most likely going to fail.  "
              principles. The labs were hands-on and very informative."
            </Text>
          </TouchableOpacity>
          <View style={styles.horizontalLine3} />
        </View>
      </ScrollView>

    </View>
  );
};

const APBiologyScreen = ({ navigation }) => {


  const videoUrl = `https://www.youtube.com/watch?v=WPjUp-3lXNM`; // Dr Davis into vid 
  return (
    <View style={{ flex: 1 }}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Conditional Video Display */}
      {
        <WebView
          source={{ uri: videoUrl }}
          style={{ flex: 1, marginBottom: 0 }}
          allowsFullscreenVideo={true}
          javaScriptEnabled={true}
        />
      }

      {/* Scrollable Content */}
      <ScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
      >

        <View style={styles.descriptionContainer1}>
        <View style={styles.courseQuizframe}>


          <View style={styles.qqhorizontalspaceabove} />
          <Text style={[styles.menuTitles, {margintop: 100, textAlign: "center"} ]}>AP Biology</Text>
          <View style={styles.qqhorizontalspacebelow}/>
          <Text style={styles.descriptionText3}>
            Advanced Placement Biology is designed to be the equivalent of a college introductory biology course, and to prepare students for the AP Biology exam held each spring.  It incorporates the necessary lab and discussion topics required to understand the four “Big Ideas” in the revised AP Bio curriculum.
          </Text>
          </View>
          <View style={styles.horizontalLine3} />

          <Text style={styles.courseQuizTitleText}> Opinions from other students </Text>
          <View style={styles.horizontalLine3} />

          <TouchableOpacity
            style={styles.reviewCard}
            onPress={() => {
              /* navigation or action here */
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={DLogo} style={styles.previewImage} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.reviewerName}> Abuki M.</Text>
                <Text style={styles.reviewDate}>February 26, 2024</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "AP Biology was So much material. get ready to work !!!. At first, it felt super tough, but then it got really interesting.
              We did cool labs and learned about how life works, which was mind-blowing. I had to study a lot,
              like a few hours every week, to keep up. But it was worth it. We did a big project on genes that made everything
              click for me. I aced the AP exam with a 5, and now I'm all in on studying biology in the future. If you're thinking
              about taking AP Bio, definitely do it. You'll have to put in the time to study,
              but you'll learn so much and it's totally worth the effort."
            </Text>
          </TouchableOpacity>
          <View style={styles.horizontalLine1} />

          <View style={styles.horizontalLine} />

          <TouchableOpacity
            style={styles.reviewCard}
            onPress={() => {
              /* navigation or action here */
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={DLogo} style={styles.previewImage} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.reviewerName}>Asa Tusing.</Text>
                <Text style={styles.reviewDate}>febuary 23, 2024</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "AP Biology? Yeah, I took that. Honestly, wasn't sure I'd like it, but it turned out pretty cool.
              It's not just reading textbooks; we actually did experiments, which made it way more engaging. Gotta say,
              it requires commitment. I spent a couple hours every week just going over notes and prepping for tests. The key?
              Stay organized and don't fall behind. I pulled off a solid score on the AP exam, which felt great. If you're into
              science and up for a challenge, AP Bio's the way to go. Just be ready to hit the books regularly."
            </Text>
          </TouchableOpacity>
          <View style={styles.horizontalLine3} />
        </View>
      </ScrollView>

    </View>
  );
};





const NaInScreen = ({ navigation }) => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const greetings = ["here you'll find the differnt tools that deering uses", " ستجد هنا الأدوات المختلفة التي يستخدمها Deering", " Aqui você encontrará as diferentes ferramentas que Deering usa", " Awa okokuta bisaleli ekeseni oyo deering esalelaka"];

  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity for the text

  const fadeTransition = () => {
    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start(() => {
      // Change the greeting after fade out
      setCurrentGreeting(currentGreeting => (currentGreeting + 1) % greetings.length);
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();
    });
  };

  useEffect(() => {

    const checkIfShown = async () => {
      const hasShown = await AsyncStorage.getItem('hasShownNaInScreen');
      if (hasShown) {
        // If the screen has already been shown, navigate to the next screen directly
        navigation.navigate('instructions');
      }
    };

    checkIfShown();

    const intervalId = setInterval(() => {
      fadeTransition();
    }, 3000); // Change text every 3 seconds with fade transition

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  const handleNextPress = async () => {
    // Mark this screen as shown
    await AsyncStorage.setItem('hasShownNaInScreen', 'true');
    // Navigate to the next screen
    navigation.navigate('instructions');
  };

 
  return (
    <ImageBackground
      source={instructioons2}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.aboutContainer}>
        <TouchableOpacity
          style={styles.button2}
          onPress={handleNextPress}
          >
          <Text style={styles.buttonText}>Next </Text>
        </TouchableOpacity>
        <Animated.Text style={[styles.instructiontext, { opacity: fadeAnim }]}>
          {greetings[currentGreeting]}
        </Animated.Text>

      </View>
    </ImageBackground>
  );
};

//instruction screen after the home page 
const InstructionScreen = ({ navigation }) => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const greetings = ["Find out more about Deering here", "اكتشف المزيد عن ديرينغ هنا", "Saiba mais sobre Deering aqui", "Luká koyeba makambo mosusu etali Deering awa"];

  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity for the text

  const fadeTransition = () => {
    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start(() => {
      // Change the greeting after fade out
      setCurrentGreeting(currentGreeting => (currentGreeting + 1) % greetings.length);
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();
    });
  };

  useEffect(() => {

    const checkIfShown = async () => {
      const hasShown = await AsyncStorage.getItem('hasShownInstructionScreen');
      if (hasShown) {
        // If the screen has already been shown, navigate to the next screen directly
        navigation.navigate('HpInScreen');
      }
    };

    checkIfShown();

    const intervalId = setInterval(() => {
      fadeTransition();
    }, 3000); // Change text every 3 seconds with fade transition

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  const handleNextPress = async () => {
    // Mark this screen as shown
    await AsyncStorage.setItem('hasShownInstructionScreen', 'true');
    // Navigate to the next screen
    navigation.navigate('HpInScreen');
  };


  return (
    <ImageBackground
      source={instructioons}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.aboutContainer}>
        <TouchableOpacity
          style={styles.button2}
          onPress={handleNextPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <Animated.Text style={[styles.instructiontext, { opacity: fadeAnim }]}>
          {greetings[currentGreeting]}
        </Animated.Text>

      </View>
    </ImageBackground>
  );
};

const HpInScreen = ({ navigation }) => {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const greetings = ["Change the language for the home page here", "قم بتغيير لغة الصفحة الرئيسية هنا", "Altere o idioma da página inicial aqui", "Kobongola monɔkɔ mpo na lokasa ya ndako awa"];

  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity for the text

  const fadeTransition = () => {
    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start(() => {
      // Change the greeting after fade out
      setCurrentGreeting(currentGreeting => (currentGreeting + 1) % greetings.length);
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();
    });
  };

  useEffect(() => {

    const checkIfShown = async () => {
      const hasShown = await AsyncStorage.getItem('hasShownHpInScreen');
      if (hasShown) {
        // If the screen has already been shown, navigate to the next screen directly
        navigation.navigate('Home');
      }
    };

    checkIfShown();

    const intervalId = setInterval(() => {
      fadeTransition();
    }, 3000); // Change text every 3 seconds with fade transition

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  const handleNextPress = async () => {
    // Mark this screen as shown
    await AsyncStorage.setItem('hasShownHpInScreen', 'true');
    // Navigate to the next screen
    navigation.navigate('Home');
  };


  return (
    <ImageBackground
      source={instructioons1}
      style={styles.backgroundImage}
      resizeMode="cover">
      <View style={styles.aboutContainer}>
        <TouchableOpacity
          style={styles.button2}
          onPress={handleNextPress}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
        <Animated.Text style={[styles.instructiontext, { opacity: fadeAnim }]}>
          {greetings[currentGreeting]}
        </Animated.Text>

      </View>
    </ImageBackground>
  );
};


//video screen component (this allows the app to actually view the videos that i imported from youtube)

const config = {
  animation: 'timing',
  config: {
    duration: 500,
  },
};

const expandTransition = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current: { progress } }) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [4, 1],
      extrapolate: 'clamp',
    });

    return {
      cardStyle: {
        transform: [{ scale }],
      },
    };
  },
};

const VideoScreen = ({ route, navigation }) => {
  const { videoUrl } = route.params; // Assuming you're passing `videoUrl` correctly
  
  return ( <View style={StyleSheet.absoluteFill}>
  <WebView source={{ uri: videoUrl }} style={{ flex: 1 }} /> 

     <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

  </View>
  );
};

// Stack navigator (if needed for more complex navigation)
const Stack = createStackNavigator();

// Bottom tab navigator
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'IC') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'OrangePass') {
            iconName = focused
              ? 'document-text'
              : 'document-text-outline';
          } else if (route.name === 'Task') {
            iconName = focused ? 'school' : 'school-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'lightgray',
        tabBarStyle: {
          height: 100, // Increased height
          paddingBottom: 30, // Adjust padding for alignment
          backgroundColor: 'purple', // Set the background color to purple
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="IC" component={ICScreen} />
      <Tab.Screen name="OrangePass" component={OrangePassScreen} />
      <Tab.Screen name="Task" component={TaskScreen} />
    </Tab.Navigator>
  );
};

// Main App component
const App = () => {
  // actual app and navigation code.
  const [loaded] = useFonts({
    Rumblesport: require('./assets/fonts/RumblesportathleticcapsBold-ZxDJ.otf')
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SchoolCodeInputScreen">
       <Stack.Screen 
       name="SchoolCodeInputScreen" 
       component={SchoolCodeInputScreen} 
       options={{ headerShown: false }} 
       /> 
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{ gestureEnabled: false, headerShown: false, }}
        />
        <Stack.Screen
          name="instructions"
          component={InstructionScreen}
          options={{ headerShown: false }}
        
        />
        <Stack.Screen
          name="HpInScreen"
          component={HpInScreen}
          options={{ headerShown: false }}
        
        />
        <Stack.Screen
          name="NaInScreen"
          component={NaInScreen}
          options={{ headerShown: false }}
        
        />
        <Stack.Screen
          name="Lost"
          component={TipsScreen}
          options={{ headerShown: false}}
        
        />
        <Stack.Screen
          name="Resources"
          component={ResourcesScreen}
          options={{ headerShown: false }}
      
        />
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ gestureEnabled: false, headerShown: false, }}

        />
        <Stack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ICVScreen"
          component={ICVScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OPVScreen"
          component={OPVScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="VideoScreen"
          component={VideoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GCVScreen"
          component={GCVScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CQScreen"
          component={CQScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="APPSScreen"
          component={APPSScreen}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="APCompSciSScreen"
          component={APCompSciSScreen}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="APBiologyScreen"
          component={APBiologyScreen}
          options={{ headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// after the home screen stack you can Add other stack screens here if necessary. perhaps the login screen. thats if were still doing that

// Styles

const styles = StyleSheet.create({
 
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent' , // or any other color
    width: '100%',
  },

  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // You can change the background color
  },

  backgroundImage: {
    flex: 1,
    width: '100%', // Set the width to 100% to match the modal width
    height: '100%', // Set the height to 100% to match the modal height
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 400, // Adjust the size as needed
    height: 1000, // Adjust the size as needed
  },

  aboutContainer: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  aboutText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  instructiontext: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 280,
  },
  menuTitles: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -120,
    paddingHorizontal: 15
  },
  mtfResources: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'purple',
    marginTop: -130,
  },
  menuTitles1: {
    fontFamily: 'Rumblesport',
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -30,
  },
  menuTitles2: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'purple',
    marginLeft: 100,
  },
  menuTitles3: {
    fontFamily: 'Rumblesport',
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: 'purple',
    marginTop: -5,
    zindex: 50
  },
  menuTitles4: {
    
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: 'purple',
    
    zindex: 50
  },
  
  aboutscreentext: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    marginBottom: 20,
  },
  button1: {
    //button on the about page
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 50,

  },
  button2: {
    // Position the button in the middle of the screen
    position: 'absolute', // Absolute position for the button
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    top: '50%', // Position the top edge of the button at the middle of the screen
    left: '50%', // Position the left edge of the button at the middle of the screen
    transform: [{ translateX: -50 }, { translateY: -50 }], // Adjust the button to be truly centered
    //width: 400,

  },
  buttonText: {
    color: 'purple',
    fontWeight: 'bold',
  },
  //this one is for the menu screen button text
  mbuttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  qbuttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'purple',
    fontWeight: 'bold',
  },

  courseQuizTitleText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'purple',
    fontWeight: 'bold',
    textDecorationLine: "underline",
  },
  
  zbuttonText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'purple',
    fontWeight: 'bold',
  },

  descriptionText: {
    color: 'white',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  descriptionText2: {
    color: 'purple',
    paddingHorizontal: 20,
    textAlign: 'center',
  },

  descriptionText1: {
    color: 'purple',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    textAlign: 'center',
  },

  descriptionText3: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    textAlign: 'center',
  },

  // code for the modal window video screen
  backButton: {
    color: 'white',
    zIndex: 999,
    position: 'absolute',
    top: 70, // brings the box lower or higher
    left: 20,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },

  killSwitch: {
    color: 'white',
    zIndex: 999,
    position: 'absolute',
    top: 70, // brings the box lower or higher
    right: 20,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },



  floatingButton: {
    position: 'absolute',
    right: 10,
    bottom: 10, // Adjust positioning as needed
    backgroundColor: 'purple', // Adjust your button styling as needed
    padding: 10,
    borderRadius: 25,
    zIndex: 1, // Make sure this is above other screen content
  },

  horizontalLine: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    alignSelf: 'stretch', // Makes the line stretch to the full width of the container
    marginVertical: 20, // Adds space above and below the line
  },

  // seperating the languages in every tutorial screen
  horizontalLine2: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    alignSelf: 'stretch', // Makes the line stretch to the full width of the container
    marginVertical: 20, // Adds space above and below the line
  },
  horizontalLine3: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    alignSelf: 'stretch', // Makes the line stretch to the full width of the container
    marginVertical: 21, // Adds space above and below the line
  },

  horizontalLine4: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    alignSelf: 'stretch', // Makes the line stretch to the full width of the container
    marginVertical: 87, // Adds space above and below the line
  },

  horizontalLine5: {
    width: width - 40, // Adjust width as needed
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    alignContent: 'center', // Makes the line stretch to the full width of the container
    marginVertical: 20, // Adds space above and below the line
    
  },

  qqhorizontalspacebelow: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    alignSelf: 'stretch', // Makes the line stretch to the full width of the container
    marginVertical: 10, // Adds space above and below the line
  },

  qqhorizontalspaceabove: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 1,
    alignSelf: 'stretch', // Makes the line stretch to the full width of the container
    marginVertical: 65, // Adds space above and below the line
  },

  descriptionContainer1: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },


  previewImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5, // Optional: for rounded corners
  },

  listContainer: {
    paddingHorizontal: 10,
    alignItems: 'flex-start', // Align items to the start of the container
  },
  card: {
    margin: 10,
    backgroundColor: '#d1acd5',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    width: (width / 2.2) - 15, // Adjust the division to control the width of the cards
  },
  cardTitle: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
   input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  frame: {
    alignItems: 'center',
    width: width - 40, // Adjust width as needed
    backgroundColor: '#3d0d7a',
    padding: 20,
    borderRadius: 20,
    borderWidth: 0,
    elevation: 5,
    marginTop: 25,
    zindex: 100,
    },

  courseQuizframe: {
    alignItems: 'center',
    width: width - 40, // Adjust width as needed
    backgroundColor: '#9882b8',
    padding: 20,
    borderRadius: 20,
    borderWidth: 0,
    elevation: 5,
    marginTop: 25,
    zindex: 100,
    },

});

export default App;
