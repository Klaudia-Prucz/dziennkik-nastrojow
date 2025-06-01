import { Button, Modal, StyleSheet, Text, View } from 'react-native';

export default function Powiadomienie({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttons}>
            {onCancel && (
              <Button title="Anuluj" onPress={onCancel} color="#CCC" />
            )}
            <Button title="OK" onPress={onConfirm} color="#F7C8E0" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFF8F0',
    padding: 24,
    borderRadius: 16,
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: '#444',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
});
