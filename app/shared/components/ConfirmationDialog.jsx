import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const ConfirmationDialog = ({ visible, message, onCancel, onConfirm }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
          <Text className='text-base text-center'>{message}</Text>
          <View className='flex-row items-center mt-4'>
            <TouchableOpacity onPress={onCancel} className="bg-gray-500 p-2 mx-2 br-2 rounded-md">
              <Text className='text-base color-white'>Відмінити</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} className="bg-green-700 p-2 mx-2 br-2 rounded-md">
              <Text className='text-base color-white'>Підтвердити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationDialog;
