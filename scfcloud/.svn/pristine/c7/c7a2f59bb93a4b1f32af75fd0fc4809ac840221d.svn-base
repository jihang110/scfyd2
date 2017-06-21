package com.ut.scf.web.tags;

import org.sitemesh.SiteMeshContext;
import org.sitemesh.content.ContentProperty;
import org.sitemesh.content.tagrules.TagRuleBundle;
import org.sitemesh.content.tagrules.html.ExportTagToContentRule;
import org.sitemesh.tagprocessor.State;

public class CSSTagRuleBundle implements TagRuleBundle {

	@Override
	public void install(State defaultState, ContentProperty contentProperty, SiteMeshContext siteMeshContext) {
		defaultState.addRule("scfCSS", new ExportTagToContentRule(siteMeshContext, contentProperty.getChild("scfCSS"), false));
	}

	@Override
	public void cleanUp(State defaultState, ContentProperty contentProperty, SiteMeshContext siteMeshContext) {

	}

}
