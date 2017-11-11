import React from 'react';
import {FlatList} from "react-native";
import PropTypes from 'prop-types';
import GameSessionOverview from "./GameSessionOverview";

export default class GameSessionListController extends React.Component {
    static navigationOptions = () => ({
        title: 'Game sessions',
    });

    constructor(props) {
        super(props);

        this.state = {
            gameSessions: []
        };
    }

    render() {
        return (
            <FlatList
                data={this.state.gameSessions}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }

    _renderItem = ({item}) => {
        const { navigate } = this.props;
        return <GameSessionOverview gameSession={item} navigate={navigate}/>
    };

    _keyExtractor = (item, index) => item.id;


    async componentDidMount() {
        let sessions = await this.props.fetchGameSessions();
        this.setState({
            gameSessions: sessions
        })

    }
}

GameSessionListController.propTypes = {
    fetchGameSessions: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
};
