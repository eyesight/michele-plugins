<?php

/*

Plugin Name: Simple Mail Address Encoder
Plugin URI: https://www.pwsh.ch/simple-mail-address-encoder
Description: Automatically encodes every email address in a mailto tag on posts, pages and sidebar widgets to prevent spam. Simply decodes any previously encoded email address by just clicking on the email link.
Version: 1.7
Author: TobyU
Author URI: http://www.pwsh.ch/

*/

// Simple Mail Address Encoder Class
class SimpleMailAddressEncoder {
	
	// Initilize the Plugin
	public function __construct(){
		
		// Encode e-mail addresses in post an page content
		add_filter('the_content', array(&$this, 'smae_parse'), 99, 1);
		
		// Encode e-mail addresses in sidebar text widgets
		add_filter('widget_text', array(&$this, 'smae_parse'), 99, 1);
		
		// Encode e-mail addresses in comments
		add_filter('comment_text', array(&$this, 'smae_parse'), 99, 1);
		
		// Encode e-mail addresses in post meta/custom
		add_action('the_post', array(&$this, 'smae_parse_meta'), 99);
		
		// Place the encoding js script in the footer section of the website
		add_action('wp_enqueue_scripts', array(&$this,'smae_js'), 10);
	}
	
	// Enqueue scripts at the appropriate time
	public function smae_js() {
	    wp_enqueue_script('smae.js', plugins_url('', __File__).'/smae.js', array(), '1.0.0', true);
	}
	
	// Parse content of posts and pages
	public function smae_parse($str_content){
		
		// Search array value for e-mail address links
		$str_content = preg_replace_callback('#<a (.*?)href=[\'|"](.*?)[\'|"](.*?)>(.*?)<\/a>#is', array(&$this, 'smae_replace_mail'), $str_content);
		
		return $str_content;
	}
	
	// Callback function: encode e-mail address
	private function smae_replace_mail($arr_args){
		
		// Check if the found link is a mal address
		if(strpos($arr_args[0], 'mailto:') !== false){
		
			// Encode recipient e-mail address including parameters like subject and body
			$str_mailto = str_replace('mailto:', '', $arr_args[2]);
			$str_mailto = str_replace('&amp;', '&', $str_mailto);
		 	$str_mailto = base64_encode($str_mailto);
		 	
		 	// Get visible e-mail address or link text
			$str_mail = $arr_args[4];
			
			// Get attributes of the <a> tag like class="" and id="" BEFORE the href="" attribut
			$str_before = $this->smae_parse_atts($arr_args[1]);
			
			// Get attributes of the <a> tag like class="" and id="" AFTER the href="" attribut
			$str_after = $this->smae_parse_atts($arr_args[3]);
			
			// Check if linktext is a picture or not (is not)
			if(!preg_match('#<img(.*?)src=(.*?)>#is', $str_mail)){
			
				// Recover all original chars
				$str_mail = strip_tags($str_mail);
				$str_mail = html_entity_decode($str_mail, ENT_NOQUOTES);
				
				// Encode visible e-mail address or link text
				$nr = 0;
				$str_mail_tmp = '';
				while(isset($str_mail{$nr})) {
				
					// Replace single char
				    $str_mail_tmp .= $this->smae_replace_char($str_mail{$nr});
				    $nr++;
				}
				
				// Overwrite original mail address
				$str_mail = $str_mail_tmp;
			}
			
			// Build encoded source code
			return '<a '.$str_before.' href="javascript:smae_decode(\''.$str_mailto.'\');" '.$str_after.'>'.$str_mail.'</a>';
		}
		
		// No Mail Address Link found (no mailto:)
		return $arr_args[0];
	}
	
	// Special treatment of specific attributes
	private function smae_parse_atts($str){
	
		// Init return value
		$str_return = '';
	
		// Get single attributes
		preg_match_all("#(.*?)[\"|'](.*?)[\"|']#is", $str, $arr_atts);
		
		// Loop trough all found attributes
		foreach($arr_atts[0] as $key => $attribute){
		
			// Encode the title attribute's content
			if(strpos($attribute, 'title')){
			
				// Encode title
				$nr = 0;
				$str_tmp = '';
				while(isset($arr_atts[2][$key]{$nr})) {
				
					// Replace single char
				    $str_tmp .= $this->smae_replace_char($arr_atts[2][$key]{$nr});
				    $nr++;
				}
				$arr_atts[2][$key] = $str_tmp;
			}
			
			// Build return value
			$str_return .= $arr_atts[1][$key].'"'.$arr_atts[2][$key].'" ';
		}
		
		// Return value
		return trim($str_return);
	}
	
	// Encode chars
	private function smae_replace_char($char){
		
		$int_num = ord($char);
		$int_num = (strlen($int_num) < 2) ? '00'.$int_num : $int_num ;
		$int_num = (strlen($int_num) < 3) ? '0'.$int_num : $int_num ;
		
		return '&#'.$int_num.';';
	}
	
	// Encode Mail addresses in post meta
	public function smae_parse_meta(){
		
		// Get global variable
		global $post;
		
		// Get all meta keys for the current post/page
		$arr_meta_keys = get_post_custom_keys($post->ID);
		
		// Get all meta values for the current post/page
		if(is_array($arr_meta_keys) && count($arr_meta_keys) > 0){
			
			foreach($arr_meta_keys as $key){
				
				// Encode values and save encoded values into database
				$key = trim($key);
		      	if($key{0} != '_'){
		      		
		      		// Load value
		      		$value = get_post_meta($post->ID, $key, true);
		      		
		      		// Encode
		      		if(is_array($value) === true) {
		      			
		      			// Encode array value
		      			$value_encoded = $value;
		      			foreach($value_encoded as $key => $item){
		      				
		      				$value_encoded[$key] = $this->smae_parse($item);
		      			}
		      		} 
		      		else {
		      			
		      			// Encode single value
		      			$value_encoded = $this->smae_parse($value);
		      		}
		      		
		      		// Check if value must be saved
		      		if($value_encoded != $value){
		      			
		      			// Save changed value
		      			update_post_meta($post->ID, $key, $value_encoded, $value);
		      		}
		      	}	
			}
		}
	}
}


# Run plugin if it is not called directly
# ---------------------------------------
if(defined('ABSPATH') and defined('WPINC')) {

	// Create a new object of the plugin
	$objSMAE = new SimpleMailAddressEncoder();
}

?>