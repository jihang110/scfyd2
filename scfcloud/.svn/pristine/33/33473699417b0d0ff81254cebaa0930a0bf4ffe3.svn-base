package com.ut.scf.core.util;

import java.io.StringReader;
import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JaxbUtil {
	
	private static final Logger log = LoggerFactory.getLogger(JaxbUtil.class);

	public JaxbUtil() {
		
	}
	
	/** 
     * JavaBean转换成xml 
     *  
     * @param obj 
     * @param encoding 
     * @return 
     */  
    public static String convertToXml(Object obj) {
        try {
            JAXBContext context = JAXBContext.newInstance(obj.getClass());
            Marshaller marshaller = context.createMarshaller();
			marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
            marshaller.setProperty(Marshaller.JAXB_ENCODING, "GB2312");
            marshaller.setProperty(Marshaller.JAXB_FRAGMENT, false);
            
            StringWriter writer = new StringWriter();
            marshaller.marshal(obj, writer);
            return new String(writer.toString());

        } catch (Exception e) {
            log.error("Bean to Xml String conver error: {}", e);
        }
        return null;

    }

	/** 
     * xml转换成JavaBean 
     *  
     * @param xml 
     * @param c 
     * @return 
     */  
    @SuppressWarnings("unchecked")  
    public static <T> T converyToJavaBean(String xml, Class<T> c) {  
        T t = null;
        try {
            JAXBContext context = JAXBContext.newInstance(c);
            Unmarshaller unmarshaller = context.createUnmarshaller();
            t = (T) unmarshaller.unmarshal(new StringReader(xml));
        } catch (Exception e) {
        	log.error("Xml String to Bean conver error: {}", e);
        }

        return t;
    }
}
