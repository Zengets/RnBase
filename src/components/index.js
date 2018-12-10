/**
 * Created by kurosaki on 2018/9/3.
 */
import Header from "./ui/Header";
import Titles from "./ui/Title";
import HttpUtils from './fetch/HttpUtils'
import {BASE_URL,PORT_NAME,timetrans} from './publicdata/Data';
import { NewsItem,ServiceItem,SchoolExamItem,TemporaryItem,ActivityItem } from './module';
import Modals from './ui/Modal'
import ModalBottom from './ui/ModalBottom'
import ModalTextInput from './ui/ModalTextInput'


export {Header,HttpUtils,BASE_URL,PORT_NAME,timetrans,NewsItem,ServiceItem,Titles,SchoolExamItem,TemporaryItem,Modals,ModalBottom,ModalTextInput,ActivityItem}