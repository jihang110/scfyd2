package com.ut.scf.web.tags;

import org.sitemesh.SiteMeshContext;
import org.sitemesh.content.ContentProperty;
import org.sitemesh.content.tagrules.TagRuleBundle;
import org.sitemesh.content.tagrules.html.ExportTagToContentRule;
import org.sitemesh.tagprocessor.State;

public class ScriptTagRuleBundle implements TagRuleBundle {

	@Override
	public void install(State defaultState, ContentProperty contentProperty, SiteMeshContext siteMeshContext) {
		defaultState.addRule("scfScript", new ExportTagToContentRule(siteMeshContext, contentProperty.getChild("scfScript"), false));
	}

	@Override
	public void cleanUp(State defaultState, ContentProperty contentProperty, SiteMeshContext siteMeshContext) {

	}

}
