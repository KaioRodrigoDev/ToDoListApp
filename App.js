import React,{useState, useCallback, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar,TouchableOpacity,FlatList,Modal,TextInput,AsyncStorage} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList'
import * as Animatable from 'react-native-animatable';


const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity)


export default function App() {

  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('')


  useEffect(()=> {

    async function loadTask(){
      const taskStorage = await AsyncStorage.getItem()
    }

  },[]);


  function handleAdd(){
    if(input === '') return;

    const data = {
      key:input,
      task: input

    };

    setTask([...task, data]);
    setOpen(false);
    setInput('');
  }

  
  const handleDelete = useCallback((data) =>{
    const find = task.filter(r => r.key !== data.key);
    setTask(find);
  })


  return(
    <SafeAreaView style = {styles.container}>
      <StatusBar backgroundColor = "#171d31" barStyle="light-content" />
      <View style = {styles.content}>
        <Text style = {styles.title}>Tarefas</Text>
      </View>

      <FlatList
      marginHorizontal={10}
      showsHorizontalScrollIndicator={false}
      data={task}
      keyExtractor={(item) => String(item.key) } //PORQUE AQUI SE USA PARENTESIS NO ITEM E EMBAIXO USA PARENTESES E CHAVES ?
      renderItem={({item}) => <TaskList data={item} handleDelete={handleDelete} />} //Importando a data junto

      />

      <Modal 
      animated="slide"
      transparent={false}
      visible={open}
      >

        <SafeAreaView style={styles.modal}>

          <View style={styles.modalHeader}>
            
          <TouchableOpacity onPress={()=> setOpen(false)} >
            <Ionicons style={{marginLeft:5,marginRight:5}} name="md-arrow-back" size={40}  />
          </TouchableOpacity>
          <Text style= {styles.modalTitle}> Nova Tarefa</Text>

          </View>

          <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver >
            <TextInput
            multiline={true}
            placeholderTextColor="#747474"
            autoCorrect={false}
            placeholder="O que precisa fazer hoje? "
            style={styles.input}
            value={input}
            onChangeText={(texto) => setInput(texto)}
            
            />
            <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
              <Text style={styles.handleAddText}>Cadastrar</Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>

         
      </Modal>


      <AnimatedBtn 
      style={styles.fab}
      useNativeDriver
      animation="bounceInUp"
      duration={1500}
      onPress={() => setOpen(true) }
      >
        <Ionicons name="ios-add" size={30} color='#fff'  />
      </AnimatedBtn>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
container:{
  flex:1,
  backgroundColor:'#171d31'

},
title:{
  marginTop:10,
  marginBottom: 10,
  fontSize: 22,
  textAlign: 'center',
  color:'#FFF'
  
},
fab:{
  position:'absolute',
  width:60,
  height:60,
  backgroundColor: '#0094FF',
  alignItems:'center',
  justifyContent:'center',
  borderRadius:30,
  bottom:25,
  right:25,
  elevation:2,
  zIndex:9,
  shadowColor:'#000',
  shadowOpacity:0.2,
  shadowOffset:{
    width:1,
    height:3,
  }
},
modal:{ //PORQUE COLOCAR O FLEX 1 ?
  backgroundColor:'#171d31',
  flex:1,

},
modalHeader:{
  marginLeft:5,
  marginTop:10,
  flexDirection:'row',
  alignItems:'center'

},
modalTitle:{
  marginLeft:10,
  fontSize:23,
  color:'#FFF'

},
modalBody:{
  marginTop:15,
},
input:{
  fontSize:15,
  marginLeft:10,
  marginRight:10,
  marginTop:30,
  backgroundColor:'#FFF',
  borderRadius:5,
  padding:9,
  height:80,
  textAlignVertical:'top',
  color:'#000'
},
handleAdd:{
  backgroundColor:'#FFF',
  marginTop:10,
  alignItems:'center',
  justifyContent:'center',
  marginRight:10,
  marginLeft:10,
  height:40,
  borderRadius:5,

},
handleAddText:{
  fontSize:20,

}

})