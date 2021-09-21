/* eslint-disable no-nested-ternary */
import firebase from 'firebase';
import moment from 'moment';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import {
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from '../components/Input';

import { Text, View } from '../components/Themed';
import { required, composeValidators, minLength } from '../utils/validation';

export default function Profile() {
  const [userId, setUserId] = useState(null as any);
  const [user, setUser] = useState(null as any);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false);

  useEffect(() => {
    if (firebase.auth().currentUser) {
      setUserId(firebase.auth().currentUser?.uid);
    }
  }, []);

  useEffect(() => {
    firebase
      .database()
      .ref(`users/${userId}`)
      .on(`value`, (snapshot) => {
        if (snapshot.val()) {
          setUser(snapshot.val());
        }
      });
  }, [userId]);

  const onEditInfo = (v) => {
    firebase.database().ref(`users/${userId}/`).update({
      firstName: v.firstName,
      lastName: v.lastName,
    });

    if (v.birthday) {
      firebase
        .database()
        .ref(`users/${userId}/`)
        .update({
          birthday: moment(v.birthday).format(),
        });
    }

    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Profile</Text>
      {user ? (
        <View>
          {user.email && (
            <View style={styles.section}>
              <Text style={styles.title}>Email</Text>
              <Text style={styles.label}>{user.email}</Text>
            </View>
          )}
          {user.firstName && (
            <View style={styles.section}>
              <Text style={styles.title}>First Name</Text>
              <Text style={styles.label}>{user.firstName}</Text>
            </View>
          )}
          {user.lastName && (
            <View style={styles.section}>
              <Text style={styles.title}>Last Name</Text>
              <Text style={styles.label}>{user.lastName}</Text>
            </View>
          )}
          {user.birthday && (
            <View style={styles.section}>
              <Text style={styles.title}>Birthday</Text>
              <Text style={styles.label}>
                {moment(user.birthday).format(`DD-MM-YYYY`)}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <ActivityIndicator size="large" color="#F5C500" />
      )}
      <View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.buttonText}>Edit info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => firebase.auth().signOut()}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        visible={isModalVisible}
        transparent
        statusBarTranslucent
        style={{ margin: 0 }}
      >
        <KeyboardAvoidingView>
          <View style={styles.modalWrapper}>
            <Form
              onSubmit={onEditInfo}
              render={({ handleSubmit }) => (
                <View style={styles.modal}>
                  <Field
                    name="firstName"
                    placeholder="First Name"
                    validate={required}
                    initialValue={user.firstName || ``}
                  >
                    {({ input, meta, placeholder }) => (
                      <Input
                        input={input}
                        meta={meta}
                        placeholder={placeholder}
                      />
                    )}
                  </Field>
                  <Field
                    name="lastName"
                    placeholder="Last Name"
                    validate={required}
                    initialValue={user.lastName || ``}
                  >
                    {({ input, meta, placeholder }) => (
                      <Input
                        input={input}
                        meta={meta}
                        placeholder={placeholder}
                      />
                    )}
                  </Field>
                  <Field name="birthday" placeholder="Birthday">
                    {({ input }) => (
                      <View>
                        <Text style={styles.label}>Birthday</Text>
                        <TouchableOpacity
                          style={styles.birthday}
                          onPress={() => setIsDatePickerVisible(true)}
                        >
                          <Text
                            style={{
                              color: input.value
                                ? `black`
                                : user.birthday
                                ? `black`
                                : `gray`,
                            }}
                          >
                            {input.value
                              ? moment(input.value).format(`YYYY-MM-DD`)
                              : user.birthday
                              ? moment(user.birthday).format(`YYYY-MM-DD`)
                              : `Entry birthday`}
                          </Text>
                        </TouchableOpacity>
                        {isDatePickerVisible && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={input.value || new Date()}
                            mode="date"
                            is24Hour
                            textColor="black"
                            display={
                              Platform.OS === `ios` ? `spinner` : `default`
                            }
                            onChange={(e: any) => {
                              setIsDatePickerVisible(false);
                              if (e.nativeEvent.timestamp) {
                                input.onChange(e.nativeEvent.timestamp);
                              }
                            }}
                          />
                        )}
                      </View>
                    )}
                  </Field>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Save Info</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    paddingTop: 60,
    justifyContent: `space-between`,
  },
  pageTitle: {
    fontSize: 24,
    textAlign: `center`,
    fontWeight: `bold`,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: `bold`,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  section: {
    borderBottomWidth: 1,
    borderColor: `#F5C500`,
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: `#F5C500`,
    width: `100%`,
    borderRadius: 6,
    marginTop: 25,
  },
  buttonText: {
    paddingVertical: 10,
    color: `white`,
    textAlign: `center`,
    fontSize: 18,
    fontWeight: `bold`,
    justifyContent: `center`,
  },
  birthday: {
    borderWidth: 1,
    borderColor: `#F5C500`,
    width: 250,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
  modalWrapper: {
    width: `100%`,
    height: `100%`,
    backgroundColor: `rgba(0, 0, 0, 0.5)`,
    justifyContent: `center`,
  },
  modal: {
    alignItems: `center`,
    flexDirection: `column`,
    alignSelf: `center`,
    padding: 25,
    borderRadius: 12,
    marginBottom: 100,
    width: `80%`,
  },
});
