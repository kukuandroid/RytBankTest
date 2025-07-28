import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Contacts from 'expo-contacts';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const getAcronym = (name: string = '') => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

interface ContactItemProps extends Contacts.Contact {
  onPress: (item: Contacts.Contact) => void;
}

const ContactItem = (props: ContactItemProps) => (
  <TouchableOpacity onPress={() => props.onPress(props)}>
    <View style={styles.item}>
      <View style={styles.avatarAcronym}>
        <Text style={styles.avatarText}>{getAcronym(props.name)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.phone}>{props.company}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function ContactList() {
  const [contacts, setContacts] = React.useState<Contacts.Contact[]>([]);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [pageOffset, setPageOffset] = React.useState(0);
  const PAGE_SIZE = 50;

  const fetchContacts = async (offset = 0) => {
    setLoading(true);
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data, hasNextPage: next } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName],
        pageOffset: offset,
        pageSize: PAGE_SIZE,
      });
      setContacts(prev => offset === 0 ? data : [...prev, ...data]);
      setHasNextPage(next);
      setPageOffset(offset + PAGE_SIZE);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchContacts(0);
  }, []);

  const handleLoadMore = () => {
    if (hasNextPage && !loading) {
      fetchContacts(pageOffset);
    }
  };

  const proceedAmount = (item: Contacts.Contact) => {
    router.push({ pathname: '/dashboard/transfer-amount', params: { contactId: item.id } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Choose Contacts</Text>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id ?? ''}
        renderItem={({ item }) => <ContactItem {...item} onPress={proceedAmount} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text style={{ textAlign: 'center', marginVertical: 12 }}>Loading...</Text> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backBtn: {
    marginRight: 8,
    padding: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarAcronym: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
  },
  phone: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
});
