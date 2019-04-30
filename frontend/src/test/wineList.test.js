import React from 'react';
import { shallow } from 'enzyme';
import WineList from '../components/winesList';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<WineList />', () => {
    
    it('renders Master User Cellar', () => {
        const mockCall = jest.fn();
        const wines = [{
            '0': 1,
            '1': "Undurraga",
            '2': 2016,
            '3': "Argentina",
            '4': "Cabernet",
            '5': 13,
            '6': "undurraga.jpg"
        }]
      const wrapper = shallow(<WineList 
        wines={wines} 
        send={false}
        share={false} 
        slideshow={false}
        id={1}
        edit={false} 
        cellar={mockCall}
        master={mockCall} 
        shared={mockCall}/>
      );
      expect(wrapper.find('.page_title').at(0).text()).toBe("Master User Cellar");
    });

    it('renders User Cellar', () => {
        const mockCall = jest.fn();
        const wines = [{
            '0': 1,
            '1': "Undurraga",
            '2': 2016,
            '3': "Argentina",
            '4': "Cabernet",
            '5': 13,
            '6': "undurraga.jpg"
        }]
      const wrapper = shallow(<WineList 
        wines={wines} 
        send={false}
        share={false} 
        slideshow={false}
        id={2}
        edit={false} 
        cellar={mockCall}
        master={mockCall} 
        shared={mockCall}/>
      );
      expect(wrapper.find('.page_title').at(0).text()).toBe("My Cellar");
    });

    it('renders Master Cellar', () => {
        const mockCall = jest.fn();
        const wines = [{
            '0': 1,
            '1': "Undurraga",
            '2': 2016,
            '3': "Argentina",
            '4': "Cabernet",
            '5': 13,
            '6': "undurraga.jpg"
        }]
      const wrapper = shallow(<WineList 
        wines={wines} 
        send={true}
        share={false} 
        slideshow={false}
        id={2}
        edit={false} 
        cellar={mockCall}
        master={mockCall} 
        shared={mockCall}/>
      );
      expect(wrapper.find('.page_title').at(0).text()).toBe("Master Cellar");
    });

    it('renders Share with me', () => {
        const mockCall = jest.fn();
        const wines = [{
            '0': 1,
            '1': "Undurraga",
            '2': 2016,
            '3': "Argentina",
            '4': "Cabernet",
            '5': 13,
            '6': "undurraga.jpg"
        }]
      const wrapper = shallow(<WineList 
        wines={wines} 
        send={false}
        share={true} 
        slideshow={false}
        id={2}
        edit={false} 
        cellar={mockCall}
        master={mockCall} 
        shared={mockCall}/>
      );
      expect(wrapper.find('.page_title').at(0).text()).toBe("Shared with me");
    });

    it('renders Slideshow', () => {
        const mockCall = jest.fn();
        const wines = [{
            '0': 1,
            '1': "Undurraga",
            '2': 2016,
            '3': "Argentina",
            '4': "Cabernet",
            '5': 13,
            '6': "undurraga.jpg"
        }]
        const wrapper = shallow((<WineList 
            wines={wines} 
            send={false}
            share={true} 
            slideshow={true}
            id={2}
            edit={false} 
            cellar={mockCall}
            master={mockCall} 
            shared={mockCall}/>
        ));
        expect(wrapper.find('#left_arrow').length).toBe(1);
        expect(wrapper.find('#right_arrow').length).toBe(1);
    });
  });