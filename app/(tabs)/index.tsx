import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar, ImageBackground 
} from 'react-native';

// Gambar Forum Romawi Klasik
const ROMAN_PAINTING_URL = 'https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg';

export default function App() {
  const [screen, setScreen] = useState('Login');
  const [userData, setUserData] = useState({ name: '', email: '', phone: '', pass: '' });

  // --- LOGIC VALIDASI ---
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone: string) => /^[0-9]+$/.test(phone) && phone.length >= 10;

  const romanFont = Platform.OS === 'ios' ? 'Hoefler Text' : 'serif';

  // --- SCREENS ---

  const LoginScreen = () => (
    <View style={styles.screenContainer}>
      <View style={[styles.card, {backgroundColor: 'rgba(74, 68, 57, 0.92)'}]}>
        <View style={styles.artHeader}>
          <Text style={styles.artIcon}>🏛️</Text>
          <Text style={[styles.romanTitle, {fontFamily: romanFont}]}>SECURE FORVM</Text>
          <Text style={[styles.subtitle, {fontFamily: romanFont}]}>Enter thy credentials, citizen.</Text>
        </View>
        <View style={styles.dividerRoman} />
        <TextInput placeholder="Email (Cognomen)" placeholderTextColor="#9c8c77" style={[styles.inputRoman, {fontFamily: romanFont}]} />
        <TextInput placeholder="Password (Tessera)" placeholderTextColor="#9c8c77" style={[styles.inputRoman, {fontFamily: romanFont}]} secureTextEntry />
        <TouchableOpacity style={styles.buttonRoman} onPress={() => setScreen('Home')}>
          <Text style={[styles.buttonTextRoman, {fontFamily: romanFont}]}>AUTHORIZE ACCESS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setScreen('Register')}>
          <Text style={[styles.linkText, {fontFamily: romanFont}]}>New to the Empire? <Text style={{fontWeight: 'bold', color: '#c6a871'}}>Enroll Here</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const RegisterScreen = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', pass: '', confirmPass: '' });

    const handleRegister = () => {
      if (!form.name || !form.email || !form.phone) return Alert.alert("Halt!", "All scrolls must be filled.");
      if (!validateEmail(form.email)) return Alert.alert("Error", "Format Email tidak valid!");
      if (!validatePhone(form.phone)) return Alert.alert("Error", "Nomor telepon min 10 digit!");
      if (form.pass !== form.confirmPass) return Alert.alert("Error", "Password tidak cocok!");
      setUserData(form);
      Alert.alert("Registry Success", "Data warga telah dicatat.");
      setScreen('Login');
    };

    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={[styles.card, {backgroundColor: 'rgba(92, 82, 67, 0.92)'}]}>
            <View style={styles.artHeader}>
              <Text style={styles.artIcon}>🛡️</Text>
              <Text style={[styles.romanTitle, {fontFamily: romanFont}]}>NEW CITIZEN</Text>
            </View>
            <TextInput placeholder="Name" placeholderTextColor="#9c8c77" style={[styles.inputRoman, {fontFamily: romanFont}]} onChangeText={(v) => setForm({...form, name: v})} />
            <TextInput placeholder="Email" placeholderTextColor="#9c8c77" style={[styles.inputRoman, {fontFamily: romanFont}]} onChangeText={(v) => setForm({...form, email: v})} />
            <TextInput placeholder="Phone" placeholderTextColor="#9c8c77" style={[styles.inputRoman, {fontFamily: romanFont}]} keyboardType="numeric" onChangeText={(v) => setForm({...form, phone: v})} />
            <TextInput placeholder="Pass" placeholderTextColor="#9c8c77" style={[styles.inputRoman, {fontFamily: romanFont}]} secureTextEntry onChangeText={(v) => setForm({...form, pass: v})} />
            <TextInput placeholder="Confirm" placeholderTextColor="#9c8c77" style={[styles.inputRoman, {fontFamily: romanFont}]} secureTextEntry onChangeText={(v) => setForm({...form, confirmPass: v})} />
            <TouchableOpacity style={[styles.buttonRoman, {backgroundColor: '#a6341e'}]} onPress={handleRegister}>
              <Text style={[styles.buttonTextRoman, {fontFamily: romanFont}]}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setScreen('Login')}>
              <Text style={[styles.linkText, {fontFamily: romanFont}]}>Return to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  const HomeScreen = () => (
    <View style={styles.screenContainer}>
      <View style={[styles.card, {backgroundColor: 'rgba(61, 57, 50, 0.95)'}]}>
        <Text style={styles.artIcon}>👑</Text>
        <Text style={[styles.romanTitle, {fontFamily: romanFont}]}>SALVE, {userData.name || 'CITIZEN'}!</Text>
        <View style={styles.dividerRoman} />
        <Text style={[styles.infoText, {fontFamily: romanFont}]}>"Thy data is as secure as the Imperial Vault."</Text>
        <TouchableOpacity style={[styles.buttonRoman, {backgroundColor: '#72706e', marginTop: 30}]} onPress={() => setScreen('Login')}>
          <Text style={[styles.buttonTextRoman, {fontFamily: romanFont}]}>TERMINATE SESSION</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground source={{uri: ROMAN_PAINTING_URL}} style={styles.mainBackground} resizeMode="cover">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      {screen === 'Login' && <LoginScreen />}
      {screen === 'Register' && <RegisterScreen />}
      {screen === 'Home' && <HomeScreen />}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainBackground: { flex: 1, backgroundColor: '#2d2a26' },
  screenContainer: { flex: 1, justifyContent: 'center', padding: 20 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', paddingVertical: 40, paddingHorizontal: 20 },
  card: { padding: 25, borderRadius: 24, borderWidth: 1, borderColor: '#c6a871', elevation: 15 },
  artHeader: { alignItems: 'center', marginBottom: 20 },
  artIcon: { fontSize: 50, textAlign: 'center', marginBottom: 5 },
  romanTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#e8e1d3', letterSpacing: 2, textTransform: 'uppercase' },
  subtitle: { fontSize: 13, color: '#b9ad98', textAlign: 'center', fontStyle: 'italic' },
  inputRoman: { backgroundColor: '#3d3932', padding: 15, borderRadius: 10, marginBottom: 15, color: '#e8e1d3', borderWidth: 1, borderColor: '#5c5243' },
  buttonRoman: { backgroundColor: '#526c8a', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonTextRoman: { color: '#f8fafc', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  linkText: { color: '#b9ad98', marginTop: 15, textAlign: 'center' },
  dividerRoman: { height: 1, backgroundColor: '#c6a871', marginVertical: 15, opacity: 0.5 },
  infoText: { color: '#e8e1d3', textAlign: 'center', fontStyle: 'italic', fontSize: 16 }
});