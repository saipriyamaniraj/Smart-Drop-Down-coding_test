import React, { Component } from 'react';
import { Select } from 'antd';
import { Card } from 'antd';
import "antd/dist/antd.css";
import { Input } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

class CountryDisplay extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { Search } = Input;
        return (
            <div>
                <Card style={{ borderColor: 'Red', width: 400, marginTop: 10, marginLeft: "35%" }}>
                    <div >
                        <strong style={{ marginLeft: 5 }}>Select a location</strong>
                        <CaretDownOutlined style={{ float: 'right' }} />
                    </div>
                </Card>
                <Card style={{ borderColor: 'Red', width: 400, marginLeft: "35%", height: 100 }}>
                    <Search
                        placeholder="Search Countries"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                    />

                </Card>

            </div>
        )
    }
}

export default CountryDisplay;