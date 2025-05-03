type FormData = {
  lastName: string;
  firstName: string;
  date: Date;
  email: string;
  signature: string;
  selectedOption: string;
};
import { Image, StyleSheet, Platform, TextInput, Pressable, Modal } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { TextController } from '../controllers/TextController';
import DateTimePicker from '@react-native-community/datetimepicker';
import SignatureScreen from 'react-native-signature-canvas';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function HomeScreen() {
  const [text, setText] = useState('');
  const [formattedText, setFormattedText] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [formattedFirstName, setFormattedFirstName] = useState('');
  const [formattedLastName, setFormattedLastName] = useState('');
  const [email, setEmail] = useState('');
  const [formattedEmail, setFormattedEmail] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [signature, setSignature] = useState('');
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleTextChange = (newText: string) => {
    setText(newText);
    try {
      if (!TextController || typeof TextController.formatText !== 'function') {
        setFormattedFirstName('Error: Controller not available');
        return;
      } 
      if (!TextController) {
        console.error('TextController is undefined');
        setFormattedText('Error: Controller not found');
        return;
      }

      if (typeof TextController.formatText !== 'function') {
        console.error('formatText method is not available');
        setFormattedText('Error: Format method not found');
        return;
      }
      if (TextController && TextController.formatText) {
        const formatted = TextController.formatText(newText);
        setFormattedText(formatted);
      } else {
        console.error('TextController or formatText method is undefined');
        setFormattedText('Error: Controller not available');
      }
      const formatted = TextController.formatText(newText);
      setFormattedFirstName(formatted);
    } catch (error) {
      console.error('Error formatting text:', error);
      setFormattedFirstName('Error formatting text');
    }
  };
  const handleLastNameChange = (newText: string) => {
    setLastName(newText);
    try {
      if (!TextController || typeof TextController.formatText !== 'function') {
        setFormattedLastName('Error: Controller not available');
        return;
      }
      const formatted = TextController.formatText(newText);
      setFormattedLastName(formatted);
    } catch (error) {
      console.error('Error formatting text:', error);
      setFormattedLastName('Error formatting text');
    }
  };
  const handleFirstNameChange = (newText: string) => {
    setFirstName(newText);
    try {
      if (!TextController || typeof TextController.formatText !== 'function') {
        setFormattedFirstName('Error: Controller not available');
        return;
      }
      const formatted = TextController.formatText(newText);
      setFormattedFirstName(formatted);
    } catch (error) {
      console.error('Error formatting text:', error);
      setFormattedFirstName('Error formatting text');
    }
  };
  const handleEmailChange = (newText: string) => {
    setEmail(newText);
    try {
      if (!TextController || typeof TextController.formatText !== 'function') {
        setFormattedEmail('Error: Controller not available');
        return;
      }
      const formatted = TextController.formatText(newText);
      setFormattedEmail(formatted);
    } catch (error) {
      console.error('Error formatting email:', error);
      setFormattedEmail('Error formatting email');
    }
  };
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      try {
        if (!TextController || typeof TextController.formatDate !== 'function') {
          setFormattedDate('Error: Controller not available');
          return;
        }
        const formatted = TextController.formatDate(selectedDate);
        setFormattedDate(formatted);
      } catch (error) {
        console.error('Error formatting date:', error);
        setFormattedDate('Error formatting date');
      }
    }
  };
  const handleSignature = (signature: string) => {
    setSignature(signature);
  };
  const handleClear = () => {
    setSignature('');
  };
  
  const handleSubmit = () => {
    const formData: FormData = {
      lastName,
      firstName,
      date,
      email,
      signature,
      selectedOption
    };
  
    try {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      // Clear the form after successful submission
      setLastName('');
      setFirstName('');
      setDate(new Date());
      setEmail('');
      setSignature('');
      setFormattedDate('');
      setSelectedOption('');
      // Show success message
      alert('Formulaire envoyé avec succès !');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Erreur lors de l\'envoi du formulaire');
    }
  };
  
    return (
      <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
        key="logo1"
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      scrollEnabled={!showSignatureModal && !showPicker}  // Move this prop up here
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenue</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* NOM */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 5: NOM</ThemedText>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={handleLastNameChange}
          placeholder="Nom"
          placeholderTextColor="#999"
        />
      </ThemedView>

      {/* PRENOM */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 6: PRENOM</ThemedText>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={handleFirstNameChange}
          placeholder="Prenom"
          placeholderTextColor="#999"
        />
        </ThemedView>

         {/* DATE */}
        <ThemedView style={styles.stepContainer}>
  <ThemedText type="subtitle">Step 8: DATE DE NAISSANCE</ThemedText>
  <Pressable 
    onPress={() => setShowPicker(true)}
    style={styles.dateButton}
  >
    <ThemedText>{formattedDate || 'Select a date'}</ThemedText>
  </Pressable>
  {showPicker && (
    <DateTimePicker
      value={date}
      mode="date"
      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
      onChange={handleDateChange}
    />
  )}
</ThemedView>

<ThemedView style={styles.stepContainer}>
  <ThemedText type="subtitle">Step 10: COMPATIBILITE</ThemedText>
  <View style={styles.pickerContainer}>
    <Picker
      selectedValue={selectedOption}
      onValueChange={(itemValue) => setSelectedOption(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="Sélectionnez une option" value="" />
      <Picker.Item label="Option 1" value="option1" />
      <Picker.Item label="Option 2" value="option2" />
      <Picker.Item label="Option 3" value="option3" />
      <Picker.Item label="Option 4" value="option4" />
    </Picker>
  </View>
</ThemedView>

{/* COMMENTAIRE */}
        <ThemedView style={styles.stepContainer}>
  <ThemedText type="subtitle">Step 7: COMMENTAIRE</ThemedText>
  <TextInput
    style={styles.input}
    value={email}
    onChangeText={handleEmailChange}
    placeholder="Commentaire"
    placeholderTextColor="#999"
    keyboardType="email-address"
    autoCapitalize="none"
  />
</ThemedView>

{/* SIGNATURE */}
<ThemedView style={styles.stepContainer}>
  <ThemedText type="subtitle">Step 9: SIGNATURE</ThemedText>
  <Pressable 
    style={styles.dateButton}
    onPress={() => setShowSignatureModal(true)}
  >
    <ThemedText>{signature ? 'Signature capturée' : 'Appuyer pour signer'}</ThemedText>
  </Pressable>
  <Modal
    visible={showSignatureModal}
    transparent={true}
    animationType="slide"
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <SignatureScreen
          onOK={(sig) => {
            handleSignature(sig);
            setShowSignatureModal(false); // Close the modal here
          }}
          onClear={handleClear}
          // Remove the onClose prop as it is not supported
          descriptionText="Signez ici"
          clearText="Effacer"
          confirmText="Valider"
          webStyle={`
            .m-signature-pad {
              width: 100%;
              height: 100%;
              background-color: white;
            }
            .m-signature-pad--body {
              border: none;
            }
            .m-signature-pad--footer {
              display: flex;
              justify-content: space-between;
              padding: 10px;
            }
            .m-signature-pad--footer .button {
              background-color: #A1CEDC;
              color: #000;
              padding: 10px 20px;
              border-radius: 5px;
            }
          `}
          autoClear={true}
          imageType="image/png"
          dotSize={2}
          minWidth={2}
          maxWidth={4}
          penColor="black"
          backgroundColor="white"  
          />
          </View>
        </View>
      </Modal>
    </ThemedView>
        

            

      


      {/* Submit Button */}
<ThemedView style={styles.stepContainer}>
  <Pressable 
    style={({ pressed }) => [
      styles.submitButton,
      { opacity: pressed ? 0.8 : 1 }
    ]}
    onPress={handleSubmit}
  >
    <ThemedText style={styles.submitButtonText}>
      Confirmer et Enregistrer
    </ThemedText>
  </Pressable>
</ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
    color: Platform.OS === 'ios' ? '#000' : '#333',
    backgroundColor: '#fff',
    width: '100%',
    
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  signatureContainer: {
    height: 400,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginVertical: 10,
    position: 'relative',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
    height: 400,
    overflow: 'hidden',
  },
  submitButton: {
    backgroundColor: '#A1CEDC',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginVertical: 8,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
    color: Platform.OS === 'ios' ? '#000' : '#333',
  },
});
