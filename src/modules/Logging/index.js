import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, Dimensions, Alert} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {PieChart} from 'react-native-chart-kit';
import moment from 'moment';
import _countBy from 'lodash/countBy';
import {getLogs, removeLogs} from '../../actions/Logging';

import {Text, Back, Button} from '../../components';
import {colors, fontSize} from '../../constant';
import {scale} from '../../utils/resolutions';
import {Layout} from '../../views';

const screenWidth = Dimensions.get('window').width;

const _colors = {
  400: {color: colors.white, bgColor: '#113CFC'},
  401: {color: colors.white, bgColor: '#FF5151'},
  404: {color: colors.black, bgColor: '#FBFF00'},
  406: {color: colors.white, bgColor: '#3E7C17'},
  409: {color: colors.white, bgColor: '#FF9300'},
  500: {color: colors.white, bgColor: '#DB2121'},
  504: {color: colors.white, bgColor: '#000000'},
};

const chartConfig = {
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

const renderStatus = status => {
  let item = _colors[status] || {color: colors.black, bgColor: colors.white};
  return (
    <View style={[styles.status, {backgroundColor: item.bgColor}]}>
      <Text bold style={[styles.textHeader, {color: item.color}]}>
        {status}
      </Text>
    </View>
  );
};

const Logging = () => {
  const [logs, setLogs] = useState(null);
  const [data, setData] = useState(null);

  const fetchLogs = async () => {
    try {
      let response = await getLogs();
      setLogs(response);
      let countStatus = _countBy(response.map(i => i.status));
      let dataChart = Object.keys(countStatus).map(status => ({
        name: status,
        count: countStatus[status],
        color: _colors[status]?.bgColor || colors.graySystem1,
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      }));
      setData(dataChart);
    } catch (error) {}
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleRemoveLogs = async () => {
    try {
      await removeLogs();
      await new Promise(resolve => {
        Alert.alert('Success');
        setLogs([]);
        setData(null);
        resolve();
      });
    } catch (error) {}
  };

  const keyExtractor = (item, index) => `${item?.created_at}-${index}`;

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text bold style={styles.textHeader}>
          {(item?.created_at &&
            moment.unix(item.created_at).format('DD/MM/YYYY HH:mm:ss')) ||
            'Unknown'}
        </Text>
        {renderStatus(parseInt(item?.status, 10))}
      </View>
      <Text style={styles.url}>{item?.url}</Text>
      <Text>{JSON.stringify(item?.data)}</Text>
      {item?.body && (
        <Text style={styles.body}>{JSON.stringify(item?.body)}</Text>
      )}
    </View>
  );

  return (
    <Layout>
      <View style={styles.header}>
        <Back />
        <Text bold color={colors.background1} style={styles.title}>
          {'Logging'}
        </Text>
      </View>
      <FlatList
        data={logs}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={<Text style={styles.noData}>{'No data'}</Text>}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Button
              title="Remove logs"
              color={colors.redSystem}
              onPress={handleRemoveLogs}
            />
            {data?.length > 0 ? (
              <PieChart
                data={data}
                width={screenWidth}
                height={scale(220)}
                chartConfig={chartConfig}
                accessor={'count'}
                backgroundColor={colors.white}
              />
            ) : null}
          </View>
        }
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(10),
  },
  title: {
    fontSize: fontSize.large,
  },
  listHeader: {
    margin: scale(6),
  },
  noData: {
    textAlign: 'center',
    marginTop: scale(10),
  },
  card: {
    backgroundColor: colors.white,
    padding: scale(10),
    marginHorizontal: scale(6),
    marginVertical: scale(4),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.systemGray,
    borderBottomWidth: 0.8,
    paddingBottom: scale(6),
    marginBottom: scale(4),
  },
  status: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(1),
  },
  textHeader: {
    fontSize: fontSize.smaller,
  },
  contentContainer: {
    paddingBottom: scale(isIphoneX() ? 35 : 25),
  },
  url: {
    marginBottom: scale(7),
  },
  body: {
    marginTop: scale(7),
    color: colors.red,
  },
});

export default React.memo(Logging);
