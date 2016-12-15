import React, {Component} from 'react';
import './glonass.scss';
import {
    Header, Sidebar,
    SidebarItem, Workspace,
    Darkness, GlonassMap,
} from '../../components';
import {geoApi} from '../../utils/socket.io';

/**
 * Glonass
 */
export default class Glonass extends Component {
  /**
   * Glonass constructor
   * links functions with context of
   * element
   */
  constructor() {
    super();
    this.state = {
        devices: [],
        sidebar: false,
        search: '',
        choosenDeviceImei: '',
    };
    this.onBurgerClick = this._onBurgerClick.bind(this);
    this.onGeoStateChanged = this._onGeoStateChanged.bind(this);
    this.filterByNames = this._filterByNames.bind(this);
    this.mapToSidebarItem = this._mapToSidebarItem.bind(this);
    this.onSearch = this._onSearch.bind(this);
    this.geoApi = geoApi;
  }
  /**
   * Fired after component will be mounted
   */
  componentDidMount() {
    this.geoApi.on('devices', this.onGeoStateChanged);
  }
  /**
   * Fired before compenent will unmount
   */
  componentWillUnmount() {
    this.geoApi.removeListener('devices-coords', this.onGeoStateChanged);
  }
  /**
   * Socket message reveicer
   * @param  {Array} devices geo api array of devices
   */
  _onGeoStateChanged({devices}) {
    console.info(devices);
    this.setState(Object.assign(this.state, {
      devices,
    }));
  }
  /**
   * When burget is clicked this
   * function will change state of
   * component to enable sidebar
   */
  _onBurgerClick() {
    this.setState(Object.assign(this.state, {
        sidebar: !this.state.sidebar,
    }));
  }
  /**
   * Callback for filter devices array
   * @param  {String} options.name device name
   * @return {Boolean} whether or whether not starts with name
   */
  _filterByNames({name}) {
    return name.toLowerCase()
      .startsWith(this.state.search
        .toLowerCase()
      );
  }
  /**
   * On click add device imei as filter for glonass map
   * @param  {Object} device tracked device
   */
  _onSidebarItemClick(device) {
    let enabled = device.imei == this.state.choosenDeviceImei;
    this.setState(Object.assign(this.state, {
      choosenDeviceImei: enabled ? '' : device.imei,
    }));
  }
  /**
   * Map array callback to SidebarItem react component
   * @param  {Object} device tracked device
   * @param  {Number} i integer, index of element in array
   * @return {Array} collection of react components
   */
  _mapToSidebarItem(device, i) {
    return <SidebarItem
      key={i}
      device={device}
      onSidebarItemClick={this._onSidebarItemClick.bind(this, device)}
      choosen={device.imei == this.state.choosenDeviceImei}
    />;
  }
  /**
   * Set search string when user typing in search bar
   * @param  {String} search query
   */
  _onSearch(search) {
    this.setState(Object.assign(this.state, {
      search,
      choosenDeviceImei: '',
    }));
  }
  /**
   * Render Glonass Application
   * @return {React.Component} glonass app compoenent
   */
  render() {
    return (
         <div className="b-glonass">
            <Workspace>
                <GlonassMap
                  devices={this.state.devices}
                  filter={this.state.choosenDeviceImei}
                />
            </Workspace>
            <Darkness
                active={this.state.sidebar}
                onBurgerClick={this.onBurgerClick}
            />
            <Header
                active={this.state.sidebar}
                onBurgerClick={this.onBurgerClick}
            />
            <Sidebar
              active={this.state.sidebar}
              onSearch={this.onSearch}>
                {this.state.devices.length
                  ? this.state.devices
                      .filter(this.filterByNames)
                      .map(this.mapToSidebarItem)
                  : <SidebarItem isSpecial={true}>
                      There is no devices yet...
                    </SidebarItem>}
            </Sidebar>
         </div>
    );
  }
}
