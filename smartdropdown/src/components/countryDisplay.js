import React, { Component } from 'react';
import { Card, Select, Button, Tag, Tooltip , message as AntMessage, Switch  } from 'antd';
import { connect } from 'react-redux';
import "antd/dist/antd.css";
import { CaretDownOutlined , CaretUpOutlined} from '@ant-design/icons';
import { getCountryNames, addCountryNames } from '../reduxFlow/smartActions';

const {Option} = Select;

class CountryDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredCountry : null,
            searchCountry: '',
            prevSearchCountry: '',
            tagColor : '#87d068',
            swtichValue : 'admin',
            cardView : false,
            selectedValue : null
        }
    }

    componentDidMount = async () => {
        const { dispatch } = this.props
        await getCountryNames(dispatch);
    }

     onChange = (value) => {
         this.setState({selectedValue : value , prevSearchCountry : null})
      }
      
     onSearch = (val) => {
        this.setState(
            prevState => {
              return {
                searchCountry: val,
                prevSearchCountry: prevState.searchCountry,
                selectedValue:null,
                tagColor:'#87d068'
              };
            },
          );
         if(val !==''){
            const {countryNames } = this.props;
            let tempArray ;
            tempArray = countryNames.filter(country => country.toLowerCase().indexOf(val) !== -1);
            this.setState({filteredCountry : tempArray})
         }else{
            this.setState({filteredCountry : null})
         }

        }

        OnCountryAdd = async() => {
            const { dispatch } = this.props
            const {prevSearchCountry} = this.state;
            if(prevSearchCountry){
                const responseData = await addCountryNames(dispatch, prevSearchCountry).catch(this.handleAddError);
                if(responseData){
                    const { status } = responseData;
                    if(status == 200){
                    AntMessage.success(`${prevSearchCountry} has been added successfully`);
                    this.setState({tagColor:'#87d068' , selectedValue : prevSearchCountry});
                    }
                }else{
                    this.setState({tagColor:'#f50'});
                }
                await getCountryNames(dispatch);
            }else{

            }
        }

        handleAddError = (err) => {
            const {prevSearchCountry} = this.state
            AntMessage.error(`${prevSearchCountry} is duplicate`);
          }

          switchChange = () => {
            this.setState(
                prevState => {
                  return {
                    swtichValue: prevState.swtichValue == 'admin' ? 'user' : 'admin'
                  };
                },
              );
          }

          handleCardView = (value) => {
              this.setState({cardView:value})
          }
    

    render() {
        const { countryNames } = this.props;
        const { filteredCountry , prevSearchCountry , tagColor , swtichValue , cardView , selectedValue} = this.state;
        return (
            <div style={{marginTop : '10%'}}>
                <Card style={{ borderColor: 'black', width: 400, marginTop: 10, marginLeft: "35%" }}>
                    <div >
                        <strong style={{ marginLeft: 5 }}>Select a location</strong>
                        {cardView && <CaretDownOutlined style={{ float: 'right' }} onClick = {() => this.handleCardView(false)} />}
                      {!cardView && <CaretUpOutlined style={{ float: 'right' }} onClick = {() => this.handleCardView(true)} />}
                    </div>
                </Card>
                {cardView && <Card style={{ borderColor: 'black', width: 400, marginLeft: "35%"}}>
                <Switch style={{ float:'right'}} size="small" onChange = {this.switchChange} checkedChildren="Admin" unCheckedChildren="User" defaultChecked />
                <br></br>
                    <Select
                        showSearch
                        placeholder="Search Countries"
                        style={{ width: 200 }}
                        listHeight = {155}
                        optionFilterProp="children"
                        onChange={this.onChange}
                        onSearch={this.onSearch}
                        value = {selectedValue}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {countryNames.map(country => <Option value={country}>{country}</Option>)}
                    </Select> 
                    <Tooltip title="Searched Value">
                    {filteredCountry == null && prevSearchCountry && <Tag style={{ marginLeft: 10}} color={tagColor}>{prevSearchCountry}</Tag> }
                    </Tooltip>
                    <br></br>
                    {/* {filteredCountry == null && <Button  style={{ marginTop: 10 }} type="primary" onClick = {this.OnCountryAdd}>Add & Select</Button>} */}
                    {/* {(filteredCountry && filteredCountry.length === 0 ) && <Button  style={{ marginTop: 120 }} type="primary" onClick = {this.OnCountryAdd}>Add & Select</Button>} */}
                    { prevSearchCountry && <Button disabled = {swtichValue == 'user'?true : false} style={{ marginTop: 10 }} type="primary" onClick = {this.OnCountryAdd}>Add & Select</Button> }
                </Card>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        countryNames: state.get('smart').get('getCountryNames').toJS(),
    };
}

export default connect(mapStateToProps)(CountryDisplay);
