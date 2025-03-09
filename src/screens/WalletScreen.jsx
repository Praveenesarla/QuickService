import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import {Button} from 'react-native-paper';
import responsive from '../utils/responsive';
import WalletOfferCard from '../components/WalletOfferCard';

const {height} = Dimensions.get('window');

const transactions = [
  {
    id: '1',
    title: 'Car service',
    amount: '₹4000.00',
    transactionId: '698094554317',
    date: '18 Feb 2024 4:30 PM',
    cashback: 60,
  },
  {
    id: '2',
    title: 'Batteries',
    amount: '₹2500.00',
    transactionId: '758203984562',
    date: '30 Jan 2024 3:00 PM',
    reward: 60,
  },
  {
    id: '3',
    title: 'Detailing services',
    amount: '₹1500.00',
    transactionId: '891237645320',
    date: '5 Dec 2023 9:15 AM',
    cashback: 60,
  },
  {
    id: '4',
    title: 'A/C service',
    amount: '₹3000.00',
    transactionId: '635489201476',
    date: '22 Nov 2023 2:45 PM',
    cashback: 60,
  },
  {
    id: '5',
    title: 'Detailing services',
    amount: '₹2000.00',
    transactionId: '492837465109',
    date: '15 Oct 2023 11:30 AM',
    reward: 60,
  },
  {
    id: '6',
    title: 'A/C service',
    amount: '₹1800.00',
    transactionId: '365098712534',
    date: '28 Sep 2023 10:00 AM',
    reward: 60,
  },
];

const WalletScreen = () => {
  const renderTransaction = ({item}) => (
    <View style={styles.transactionRow}>
      <Image source={require('../assets/wallet.png')} style={styles.avatar} />
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionId}>Transaction ID</Text>
        <Text style={styles.transactionIdText}>{item.transactionId}</Text>
      </View>
      <View style={styles.transactionDetailsRight}>
        <Text style={styles.transactionAmount}>{item.amount}</Text>
        {item.cashback ? (
          <Text style={styles.rewardTag}>Cashback: {item.cashback}</Text>
        ) : (
          <Text style={styles.rewardTag}>Reward: {item.reward}</Text>
        )}
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header screen="Wallet" />

      {/* Balance Section */}
      <View style={styles.balanceCard}>
        <View>
          <Text style={styles.balanceAmount}>₹0</Text>
          <Text style={styles.balanceText}>No balance</Text>
        </View>
        <Button
          mode="outlined"
          style={styles.addMoneyButton}
          labelStyle={styles.addMoneyLabel}>
          + Add Money
        </Button>
      </View>

      {/* Transactions Section */}
      <View style={styles.transactionContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={renderTransaction}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={{flex: 1}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: 10,
            paddingBottom: responsive.padding(10),
          }}
          data={[
            {id: 1, text: 'Get 1 reward point for every ₹20 added in wallet.'},
            {id: 2, text: 'Get 1 reward point for every ₹20 added in wallet.'},
            {id: 3, text: 'Get 1 reward point for every ₹20 added in wallet.'},
          ]}
          renderItem={({item}) => <WalletOfferCard text={item.text} />}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      {/* Offers List */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F8F8F8'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {fontSize: 24, fontWeight: 'bold'},
  logo: {width: 100, height: 30, resizeMode: 'contain'},

  balanceCard: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  balanceAmount: {
    fontSize: responsive.fontSize(20),
    fontFamily: 'Outfit-Regular',
    color: '#000000',
  },
  balanceText: {
    color: '#B82929',
    fontSize: responsive.fontSize(12),
    fontFamily: 'Outfit-Light',
  },
  addMoneyButton: {
    borderColor: '#B82929',
    borderWidth: 1.5,
    borderRadius: 12,
  },
  addMoneyLabel: {
    fontSize: responsive.fontSize(12),
    color: '#B82929',
    fontFamily: 'Outfit-Regular',
  },
  transactionContainer: {backgroundColor: '#FFF', height: height * 0.58},
  sectionTitle: {
    fontSize: responsive.fontSize(20),
    fontFamily: 'Outfit-Medium',
    padding: responsive.fontSize(10),
    paddingBottom: responsive.fontSize(15),
    borderColor: '#E0E8F2',
    borderWidth: responsive.width(1.5),
    marginBottom: responsive.margin(5),
    color: '#000000',
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  avatar: {backgroundColor: '#CBD5E1', marginRight: 10, borderRadius: 10},
  transactionDetails: {flex: 1},
  transactionDetailsRight: {flex: 1, alignItems: 'flex-end'},
  transactionTitle: {
    fontSize: responsive.fontSize(17),
    fontFamily: 'Outfit-Medium',
    color: '#26273A',
  },
  transactionId: {
    fontSize: responsive.fontSize(11),
    marginTop: responsive.margin(4),
    color: '#26273A99',
  },
  transactionIdText: {
    fontSize: responsive.fontSize(12),
    color: '#26273A',
    fontFamily: 'Outfit-Medium',
  },
  transactionAmount: {
    fontSize: responsive.fontSize(16),
    fontFamily: 'Outfit-Medium',
    marginBottom: responsive.margin(6),
    color: '#26273A',
  },

  rewardTag: {
    backgroundColor: '#FECACA',
    paddingHorizontal: responsive.padding(8),
    paddingVertical: responsive.padding(4),
    borderRadius: responsive.borderRadius(5),
    fontSize: responsive.fontSize(10),
    color: '#B82929',
  },
  transactionDate: {
    fontSize: responsive.fontSize(10),
    color: '#26273A99',
    marginTop: responsive.margin(4),
  },
});

export default WalletScreen;
